"""Migrate Growfore WordPress content (parsed SQL dump) into JSON for the Next.js site.

usage: python -I migrate.py <scratch_dir> <uploads_dir> <site_dir>
"""
import json, collections, re, html, sys, os, shutil
import ftfy
from bs4 import BeautifulSoup, Comment

S, UPLOADS, SITE = sys.argv[1:4]
d = json.load(open(f'{S}/wp.json'))
blocks = json.load(open(f'{S}/pages_blocks.json'))
meta = collections.defaultdict(dict)
for m in d['iac_postmeta']:
    meta[m['post_id']][m['meta_key']] = m['meta_value']
P = {p['ID']: p for p in d['iac_posts']}

used_uploads = set()

def fix(s):
    return ftfy.fix_text(html.unescape(s or '')).replace('\xa0', ' ').strip()

def upload_path(url):
    """https://growfore.com/wp-content/uploads/2025/07/x.webp -> /wp-content/uploads/2025/07/x.webp"""
    m = re.search(r'/wp-content/uploads/(.+?)(?:\?.*)?$', url or '')
    if not m:
        return None
    rel = m.group(1)
    if os.path.exists(os.path.join(UPLOADS, rel)):
        used_uploads.add(rel)
        return '/wp-content/uploads/' + rel
    # fall back to the unsized original
    base = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', rel)
    if os.path.exists(os.path.join(UPLOADS, base)):
        used_uploads.add(base)
        return '/wp-content/uploads/' + base
    print('  missing upload', rel)
    return None

def local_link(href):
    m = re.match(r'https?://(?:www\.)?growfore\.com(/.*)?$', href or '')
    if not m:
        return href
    path = m.group(1) or '/'
    if '/wp-content/uploads/' in path:
        return upload_path(href) or href
    return path

# ---------------------------------------------------------------- services
SERVICE_GROUPS = {
    'seo-services': ['local-seo', 'seo-audits', 'keyword-research', 'on-page-seo', 'off-page-seo',
                     'technical-seo', 'content-optimization', 'wordpress-seo'],
    'web-services': ['wordpress-development', 'domain-registration-with-web-hosting', 'ecommerce-website-development',
                     'web-application-development', 'mobile-app-development', 'custom-cms-website', 'ui-ux-design'],
    'ads-services': ['google-ads', 'google-local-service-ads'],
}

def strip_included(t):
    return re.sub(r"\s*What[’']s [Ii]ncluded:?\s*$", '', t).strip()

def parse_service(slug):
    b = blocks[slug]['blocks']
    out = {'slug': slug, 'title': fix(blocks[slug]['title']), 'deliverables': [], 'faqs': []}
    i = 0
    section = None
    while i < len(b):
        kind, val = b[i]
        if kind == 'anchor':
            section = val
            i += 1
            continue
        if section == 'header' and 'headline' not in out:
            texts = []
            while i < len(b) and b[i][0] in ('p', 'h', 'btn', 'html'):
                texts.append(b[i]); i += 1
            ps = [fix(v) for k, v in texts if k == 'p']
            hs = [fix(v) for k, v in texts if k == 'h']
            out['eyebrow'] = ps[0] if len(ps) > 1 else ''
            out['headline'] = hs[0] if hs else out['title']
            out['intro'] = ps[-1] if ps else ''
            continue
        if kind == 'list' and len(val) == 1 and val[0][1]:
            # deliverable: [title w/ icon] p [included list] [outcome p]
            dl = {'id': section, 'title': fix(val[0][0]), 'icon': val[0][1], 'body': '', 'included': [], 'outcome': ''}
            i += 1
            if i < len(b) and b[i][0] == 'p':
                dl['body'] = strip_included(fix(b[i][1])); i += 1
            if i < len(b) and b[i][0] == 'list':
                dl['included'] = [fix(t) for t, _ in b[i][1]]; i += 1
            if i < len(b) and b[i][0] == 'p' and not (i + 1 < len(b) and b[i + 1][0] == 'list' and len(b[i + 1][1]) == 1 and b[i + 1][1][0][1]):
                if section != 'why-growfore':
                    dl['outcome'] = fix(b[i][1]); i += 1
            out['deliverables'].append(dl)
            continue
        if kind == 'h' and section == 'deliverables' and 'sectionTitle' not in out:
            out['sectionTitle'] = fix(val)
            if i + 1 < len(b) and b[i + 1][0] == 'p':
                out['sectionBody'] = fix(b[i + 1][1]); i += 1
            i += 1
            continue
        if section == 'why-growfore' and 'why' not in out:
            why = {'eyebrow': '', 'title': '', 'body': '', 'subtitle': '', 'points': [], 'closing': ''}
            seq = []
            while i < len(b) and b[i][0] in ('p', 'h', 'list'):
                if b[i][0] == 'h' and fix(b[i][1]).lower().startswith('ready to get started'):
                    break
                seq.append(b[i]); i += 1
            hs = [fix(v) for k, v in seq if k == 'h']
            ps = [fix(v) for k, v in seq if k == 'p']
            why['title'] = hs[0] if hs else ''
            why['subtitle'] = hs[1] if len(hs) > 1 else ''
            if ps and len(ps[0]) < 90:
                why['eyebrow'] = ps.pop(0)
            why['body'] = ps[0] if ps else ''
            why['closing'] = ps[-1] if len(ps) > 1 else ''
            for k, v in seq:
                if k == 'list':
                    why['points'] += [fix(t) for t, _ in v]
            out['why'] = why
            continue
        if kind == 'faq':
            out['faqs'] = [{'q': fix(q), 'a': fix(a)} for q, a in val if q]
        i += 1
    seo_t = blocks[slug].get('seo_title')
    out['seoTitle'] = fix(seo_t) if seo_t and '%' not in seo_t else ''
    out['seoDescription'] = fix(blocks[slug].get('seo_desc'))
    return out

services = {}
for hub, leaves in SERVICE_GROUPS.items():
    services[hub] = parse_service(hub) | {'kind': 'hub', 'children': leaves}
    for leaf in leaves:
        services[leaf] = parse_service(leaf) | {'kind': 'leaf', 'parent': hub}

# ---------------------------------------------------------------- posts
def clean_post_html(raw):
    soup = BeautifulSoup(raw, 'html.parser')
    for c in soup.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()
    for t in soup(['style', 'script', 'noscript', 'iframe', 'form', 'button', 'input']):
        t.decompose()
    for t in soup.find_all(True):
        if t.name == 'a':
            href = local_link(t.get('href'))
            attrs = {'href': href} if href else {}
            if href and href.startswith('http'):
                attrs |= {'target': '_blank', 'rel': 'noopener noreferrer'}
            t.attrs = attrs
        elif t.name == 'img':
            src = upload_path(t.get('src')) or t.get('src')
            t.attrs = {'src': src, 'alt': fix(t.get('alt', '')), 'loading': 'lazy'}
            if not t.get('src') or t['src'].startswith('data:'):
                t.decompose()
        elif t.name in ('td', 'th') and t.get('colspan'):
            t.attrs = {'colspan': t['colspan']}
        else:
            t.attrs = {}
    for t in soup.find_all(['span', 'div', 'figure']):
        if t.name == 'figure' and t.find('img'):
            continue
        t.unwrap()
    for t in soup.find_all('br'):
        if not t.find_parent(['p', 'td', 'li']):
            t.decompose()
    for t in soup.find_all(['p', 'h2', 'h3', 'h4', 'li']):
        if not t.get_text(strip=True) and not t.find('img'):
            t.decompose()
    # Headings wrapped wholesale in <strong> — drop the wrapper
    for h in soup.find_all(['h2', 'h3', 'h4']):
        kids = [k for k in h.contents if not (isinstance(k, str) and not k.strip())]
        if len(kids) == 1 and getattr(kids[0], 'name', None) in ('strong', 'b'):
            kids[0].unwrap()
    for t in soup.find_all('table'):
        wrapper = soup.new_tag('div', attrs={'class': 'table-wrap'})
        t.wrap(wrapper)
    out = ftfy.fix_text(str(soup))
    return re.sub(r'\n{2,}', '\n', out).strip()

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

posts = []
for p in d['iac_posts']:
    if p['post_type'] != 'post' or p['post_status'] != 'publish':
        continue
    m = meta[p['ID']]
    thumb = P.get(m.get('_thumbnail_id'), {}).get('guid')
    body = clean_post_html(p['post_content'])
    text = BeautifulSoup(body, 'html.parser').get_text(' ')
    words = len(text.split())
    toc = [{'id': slugify(h.get_text()), 'text': h.get_text().strip()}
           for h in BeautifulSoup(body, 'html.parser').find_all('h2')]
    # stamp ids on h2s for the table of contents
    soup = BeautifulSoup(body, 'html.parser')
    for h in soup.find_all('h2'):
        h['id'] = slugify(h.get_text())
    first_p = next((x.get_text(' ', strip=True) for x in soup.find_all('p') if len(x.get_text(strip=True)) > 60), '')
    desc = fix(m.get('rank_math_description')) or first_p[:180]
    title = fix(p['post_title'])
    seo_t = m.get('rank_math_title')
    posts.append({
        'slug': p['post_name'],
        'title': title,
        'seoTitle': fix(seo_t) if seo_t and '%' not in seo_t else '',
        'description': desc,
        'date': p['post_date'][:10],
        'modified': p['post_modified'][:10],
        'cover': upload_path(thumb) if thumb else None,
        'readingMinutes': max(1, round(words / 230)),
        'toc': toc,
        'html': str(soup),
    })
posts.sort(key=lambda x: (x['date'], x['slug']), reverse=True)

# ---------------------------------------------------------------- misc assets
for rel in ['2025/06/growfore-logo-full.webp', '2025/04/growforelogo.webp']:
    upload_path('https://growfore.com/wp-content/uploads/' + rel)

team = [
    ('Sudip Gautam', 'CEO & Founder', '2025/07/sudip-gautam.webp'),
    ('Sabina Bhandari', 'Finance Officer', '2025/07/sabina-bhandari.webp'),
    ('Sushil Gautam', 'Business Analyst', '2025/12/sudip-gautam.webp'),
    ('Pawan Bhandari', 'Sales Executive', '2026/09/pawan-bhandari.jpeg'),
    ('Asmita Karki', 'SEO Analyst', '2025/10/asmita-karki-scaled-e1760872430532.webp'),
    ('Nishal Gurung', 'Senior Fullstack Engineer', '2026/04/nisal-gurung.webp'),
    ('Tej Kshetri', 'Fullstack Engineer', '2025/07/tej-gharti-kshetri.webp'),
    ('Rojan Basnet', 'SEO Specialist', '2026/08/rojan-basnet.webp'),
]
team = [{'name': n, 'role': r, 'photo': upload_path('/wp-content/uploads/' + f)} for n, r, f in team]

clients = [
    ('Blue Swift', '2025/07/blue-swift-logo.webp'),
    ('Walkthrough', '2025/08/walkthrough_logo.webp'),
    ('SGC', '2025/07/sgc-logo-final_web-3.svg'),
    ('Suikhet Valley Resort', '2025/07/suikhet-valley-resort.webp'),
    ('Laltin', '2025/07/laltin.webp'),
    ('Taj Chicken Biryani', '2025/07/taj-chicken-biryani.webp'),
    ('Wow Fashion', '2025/07/wow-fashion.webp'),
    ('Blonde Me Black', '2025/07/blonde-me-black.webp'),
    ('Ayurveda Spa & Salon', '2025/05/cropped-WhatsApp_Image_2024-08-23_at_12.01.08_9256e24a-removebg-preview.webp'),
    ('Fishtail IVF & Fertility Centre', '2025/05/cropped-Logo-One-1.webp'),
    ('Rental Pokhara', '2025/07/rental_pokhara_logo.webp'),
    ('Mardi Himal', '2025/05/cropped-mardi_himal_logo.webp'),
    ('Calmness', '2025/05/calmness-1.webp'),
    ('Silk Cosmetics', '2025/07/silk-cosmetics.webp'),
]
clients = [{'name': n, 'logo': upload_path('/wp-content/uploads/' + f)} for n, f in clients]

place = d['iac_grp_google_place'][0]
reviews = {
    'rating': float(place['rating']),
    'count': int(place['review_count']),
    'url': place['url'],
    'items': [{'author': fix(r['author_name']), 'rating': int(r['rating']), 'text': fix(r['text']),
               'time': int(r['time'])} for r in d['iac_grp_google_review'] if not r.get('hide')],
}

# ---------------------------------------------------------------- write
os.makedirs(f'{SITE}/content', exist_ok=True)
def dump(name, obj):
    with open(f'{SITE}/content/{name}.json', 'w') as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
dump('services', services)
dump('posts', posts)
dump('team', team)
dump('clients', clients)
dump('reviews', reviews)

for rel in sorted(used_uploads):
    dst = f'{SITE}/public/wp-content/uploads/{rel}'
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(os.path.join(UPLOADS, rel), dst)
print(f'services={len(services)} posts={len(posts)} uploads={len(used_uploads)}')

privacy = next(p for p in d['iac_posts'] if p['post_name'] == 'privacy-policy' and p['post_type'] == 'page' and p['post_status'] == 'publish')
_ps = BeautifulSoup(clean_post_html(privacy['post_content']), 'html.parser')
_main = _ps.find('main') or _ps.find('body') or _ps
for _t in _main.find_all(['h1', 'title', 'meta']):
    _t.decompose()
_html = re.sub(r'\s+', ' ', _main.decode_contents()).replace('> <', '><').strip()
dump('privacy', {'modified': privacy['post_modified'][:10], 'html': _html})

# small slug index for proxy.ts (keeps the 1MB posts JSON out of the proxy bundle)
dump('slugs', sorted(list(services) + [p['slug'] for p in posts]))
