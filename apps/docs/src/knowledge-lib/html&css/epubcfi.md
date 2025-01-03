# epubcfi

EPUB CFI规范通过在EPUB出版物中使用片段标识定义引用到任意内容的标准化方法。

```xml
<?xml version="1.0"?>
 
<package version="2.0" 
         unique-identifier="bookid" 
         xmlns="http://www.idpf.org/2007/opf"
         xmlns:dc="http://purl.org/dc/elements/1.1/" 
         xmlns:opf="http://www.idpf.org/2007/opf">
    
    <metadata>
        <dc:title>...</dc:title>
        <dc:identifier id="bookid">...</dc:identifier>
        <dc:creator>...</dc:creator>
        <dc:language>en</dc:language>
    </metadata>
    
    <manifest>
        <item id="toc"
              properties="nav"
              href="toc.xhtml" 
              media-type="application/xhtml+xml"/>
        <item id="titlepage" 
              href="titlepage.xhtml" 
              media-type="application/xhtml+xml"/>
        <item id="chapter01" 
              href="chapter01.xhtml" 
              media-type="application/xhtml+xml"/>
        <item id="chapter02" 
              href="chapter02.xhtml" 
              media-type="application/xhtml+xml"/>
        <item id="chapter03" 
              href="chapter03.xhtml" 
              media-type="application/xhtml+xml"/>
        <item id="chapter04" 
              href="chapter04.xhtml" 
              media-type="application/xhtml+xml"/>
    </manifest>
    
    <spine>
        <itemref id="titleref"  idref="titlepage"/>
        <itemref id="chap01ref" idref="chapter01"/>
        <itemref id="chap02ref" idref="chapter02"/>
        <itemref id="chap03ref" idref="chapter03"/>
        <itemref id="chap04ref" idref="chapter04"/>
    </spine>
    
</package>
```

## 路径解析
斜线(/)后跟一个整数的步骤以下面的方式引用到一个或多个子节点：
- 每一个元素赋予一个正偶数，第一个元素为2，第二个为4，以此类推
- 每一个非元素节点的集合（可能为空）赋予一个奇数的序号，以表示他们在文档中的位置（他们典型的表示出版物的文本）。非元素节点集合包括第一个元素前，两个元素间，最后一个元素后面的所有内容的
- 非文本节点的非元素节点总是忽略（对于本规范，文本节点包括文本，CDATA和实体引用）这个索引的方法确保节点标识对XML解析器处理空白文本，CDATA节和实体引用是不敏感的。（例如可以避免产生以下依赖，一个XML解析器是否折叠只有空格的文本节点，或保持文本，CDATA节或实体引用作为独立的节点，或打断在多个节点中的文本）。

```shell
epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3[yyy])
```

表示为：
epubcfi表示规范，
- /6表示文档包中的第三个元素（偶数计数），即spine元素，对于标准EPUB CFI ，前导CFI必须以斜线（/）开始，后面跟一个表示在包文档根元素package下的spine子节点的引用位置的偶数。
- /4[chap01ref]! 其中，/4表示spine的第二个子元素itemref,id为chap01ref表示为[chap01ref]，后面的感叹号表示需要间接解析，即访问idref属性：chapter01，该元素在文档包中manifest定义，引用“chapter01.xhtml"文件，后面的步骤为该文件的解析，
- /4[body01] 表示第二个元素，body元素，具有id="body01",ID必须出现；
- /10[para05]表示body的第五个子元素p, 有id="para05",
- /2 表示p元素的第一个子元素em；
- /1:3[yyy] 为最后一个元素--终止元素，/1表示第一个非元素的文本，:3表示字符偏移，[yyy]表示偏移位置前的断言，断言第三个字符后(序号基于0)位置上前面为yyy字符。

**其它**

引用到img元素：epubcfi(/6/4[chap01ref]!/4[body01]/16[svgimg])

引用到xxx位置之前：epubcfi(/6/4[chap01ref]!/4[body01]/16[svgimg])

引用到yyy位置之前：epubcfi(/6/4[chap01ref]!/4[body01]/16[svgimg])

引用到yyy位置之后：epubcfi(/6/4[chap01ref]!/4[body01]/10[para05]/2/1:3)
