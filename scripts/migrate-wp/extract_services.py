import json,collections,re,html,sys
S=sys.argv[1]
d=json.load(open(f'{S}/wp.json'))
meta=collections.defaultdict(dict)
for m in d['iac_postmeta']: meta[m['post_id']][m['meta_key']]=m['meta_value']
pages={p['post_name']:p for p in d['iac_posts'] if p['post_type']=='page' and p['post_status']=='publish'}
def clean(h):
    h=re.sub(r'<br\s*/?>',' ',h or ''); h=re.sub(r'</p>\s*<p[^>]*>','\n\n',h)
    h=re.sub(r'<img[^>]*alt="([^"]*)"[^>]*>',r'\1',h)
    h=re.sub(r'<[^>]+>','',h); h=html.unescape(h).replace('\xa0',' ')
    return re.sub(r'[ \t]+',' ',h).strip()
def flat(nodes,out):
    for x in nodes:
        wt=x.get('widgetType'); s=x.get('settings') or {}; s=s if isinstance(s,dict) else {}
        eid=s.get('_element_id')
        if x.get('elType')=='container' and eid: out.append(('anchor',eid))
        if wt=='heading': out.append(('h',clean(s.get('title'))))
        elif wt=='text-editor': out.append(('p',clean(s.get('editor'))))
        elif wt=='icon-list':
            items=[(clean(i.get('text')),(i.get('selected_icon') or {}).get('value')) for i in s.get('icon_list',[])]
            out.append(('list',items))
        elif wt=='button': out.append(('btn',clean(s.get('text'))))
        elif wt=='nested-accordion':
            titles=[clean(i.get('item_title')) for i in s.get('items',[])]
            answers=[]
            for c in x.get('elements',[]):
                tmp=[]; flat(c.get('elements',[]),tmp); answers.append(' '.join(t[1] for t in tmp if t[0]=='p'))
            out.append(('faq',list(zip(titles,answers)))); continue
        elif wt in ('accordion','toggle'):
            out.append(('faq',[(clean(i.get('tab_title')),clean(i.get('tab_content'))) for i in s.get('tabs',[])]))
        elif wt=='html': out.append(('html',len(s.get('html',''))))
        elif wt: out.append(('w:'+wt,{k:str(v)[:120] for k,v in s.items() if isinstance(v,str) and len(v)>3 and not k.startswith('_')} ))
        flat(x.get('elements',[]),out)
res={}
for slug,p in pages.items():
    raw=meta[p['ID']].get('_elementor_data')
    if not raw: continue
    out=[]; flat(json.loads(raw),out)
    res[slug]={'title':p['post_title'],'seo_title':meta[p['ID']].get('rank_math_title'),'seo_desc':meta[p['ID']].get('rank_math_description'),'blocks':out}
json.dump(res,open(f'{S}/pages_blocks.json','w'),indent=1,ensure_ascii=False)
