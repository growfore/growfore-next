import sys, re, json
path, out = sys.argv[1], sys.argv[2]

def parse_values(s, i):
    # parse sequence of (..),(..); starting at i
    rows=[]
    n=len(s)
    while i<n:
        while i<n and s[i] in ' \n\r\t,': i+=1
        if i>=n or s[i]==';': break
        assert s[i]=='(', s[i:i+50]
        i+=1; row=[]
        while True:
            while s[i]==' ': i+=1
            if s[i]=="'":
                i+=1; buf=[]
                while True:
                    c=s[i]
                    if c=='\\':
                        nx=s[i+1]; buf.append({'n':'\n','r':'\r','t':'\t','0':'\0'}.get(nx,nx)); i+=2
                    elif c=="'":
                        if s[i+1]=="'": buf.append("'"); i+=2
                        else: i+=1; break
                    else: buf.append(c); i+=1
                row.append(''.join(buf))
            else:
                j=i
                while s[j] not in ',)': j+=1
                v=s[i:j].strip(); row.append(None if v=='NULL' else v); i=j
            if s[i]==',': i+=1; continue
            if s[i]==')': i+=1; break
        rows.append(row)
    return rows,i

tables={'iac_grp_google_review':[],'iac_grp_google_place':[],'iac_posts':[],'iac_postmeta':[],'iac_options':[],'iac_terms':[],'iac_term_taxonomy':[],'iac_term_relationships':[]}
cols={}
with open(path,encoding='utf-8',errors='replace') as f:
    for line in f:
        if not line.startswith('INSERT INTO `'): continue
        t=line.split('`')[1]
        if t not in tables: continue
        # accumulate statement until ends with ;\n
        stmt=line
        while not stmt.rstrip().endswith(';'):
            stmt+=next(f)
        m=re.match(r"INSERT INTO `[^`]+` \(([^)]*)\) VALUES\s*",stmt)
        cols[t]=[c.strip(' `') for c in m.group(1).split(',')]
        rows,_=parse_values(stmt,m.end())
        tables[t].extend(rows)
res={}
for t,rows in tables.items():
    c=cols.get(t,[])
    res[t]=[dict(zip(c,r)) for r in rows]
# filter postmeta: keep only for relevant posts, and skip huge
json.dump(res,open(out,'w'))
print({t:len(r) for t,r in tables.items()})
