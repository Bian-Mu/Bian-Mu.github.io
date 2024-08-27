import urllib.request as req

srcp=req.urlopen("https://baidu.com")
content=srcp.read().decode('utf-8')

with open('file.html','w+') as desp:
    desp.write(content)