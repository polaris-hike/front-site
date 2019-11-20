const $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{ logo: 'J', url: 'https://juejin.im' }, 
{ logo: 'B', url: 'https://www.bilibili.com' },
{ logo: 'V', url: 'https://www.v2ex.com' },
{ logo: 'G', url: 'https://github.com' }]

// 简化 logo 函数
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace('/\/.*','')
}

// 渲染函数
const render = ()=>{
     $siteList.find('li:not(.addItem)').remove() 
    hashMap.forEach((node,index)=>{
        const $li = $(`
        <li>
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
        <svg class="icon">
          <use xlink:href="#icon-delete"></use>
        </svg>
      </div>
    </li>
        `).insertBefore($('.addItem'))
        //  li 标签点击跳转事件
        $li.on('click',()=>{
            window.open(node.url)
        })
        // 点击删除事件
        $(".close").on('click',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}
render()


// 增加网址点击事件
$('.addItem').on('click', () => {
    let url = window.prompt('请问您要添加什么网址？')
    if(url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

// 本地化存储
 window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
} 

// 键盘监听函数
$(document).on('keypress',(e)=>{
    hashMap.forEach((node)=>{
        if(e.key === node.logo.toLowerCase()){
            window.open(node.url)
        }
    })
})
