import Utils from "./Utils.js";
// import SetNum from "./setNumberCart.js";

(function () {
    // localStorage.clear();
    var cartCon = document.querySelector(".shop-cart")
    var data = [];
    var table;
    var divCon;
    var headTilte = ["全选", "", "商品", "名称", "单价", "数量", "小计", "操作"];
    window.addEventListener("storage", storageHandler);

    if(localStorage.shoppingList){
        var arr1=JSON.parse(localStorage.shoppingList);
        console.log(arr1)
        // if(arr1.length===0) return;
        arr1.forEach(item=>{
            var arr = data.filter(item1 => {
                return item1.id === item.id;
            });
            if (arr.length === 0){
                var obj1 = {
                    id: item.id,
                    selected: false,
                    icon: item.icon,
                    title: item.title,
                    info: item.info,
                    price: Number(item.price),
                    num: Number(item.num),
                    sum: Number(item.price*item.num),
                    del: false,
                }
                
                data.push(obj1);
                console.log(obj1)
            }else{
                arr[0].num++;
                arr[0].sum = arr[0].num * arr[0].price;
            }
            
        })
        
        createTable();
    }
    document.addEventListener("step_change",stepChangeHandler)
    function storageHandler(e) {
        var arr = JSON.parse(localStorage.shoppingList)
        if (arr.length === 0) return;
        var o = arr[arr.length - 1];
        console.log(o,arr)
        var arr = data.filter(item => {
            return item.id === o.id;
        });
        if (arr.length === 0) {
            var obj = {
                id: o.id,
                selected: false,
                icon: o.icon,
                title: o.title,
                price: Number(o.price),
                num: Number(o.num),
                sum: Number(o.price*o.num),
                del: false,
            }
            data.push(obj);
        } else {
            arr[0].num++;
            arr[0].sum = arr[0].num * arr[0].price;
        }
        createTable();
    }
    function createTable() {
        if (table) {
            table.remove();
            table = null;
        }
        table = Utils.ce("table");
        table.className = "tables";
        createHead(table);
        createContent(table);
        cartCon.insertBefore(table,cartCon.firstChild);
        createFoot();
    }

    function createHead(parent) {
        var tr = Utils.ce("tr");
        console.log(tr)
        for (var i = 0; i < headTilte.length; i++) {
            var th = Utils.ce("th");
            th.textContent = headTilte[i];
            if (headTilte[i] === "全选") {
                var ck = Utils.ce("input");
                ck.type = "checkbox";
                ck.checked = data.every(item => item.selected);
                ck.addEventListener("click", selectHandler);
                th.insertBefore(ck, th.firstChild);
            }
            tr.appendChild(th);
        }
        tr.className = "thr";
        parent.appendChild(tr);
    }

    function createContent(parent) {
        for (var i = 0; i < data.length; i++) {
            console.log(data)
            var obj = data[i];
            var tr = Utils.ce("tr");
            tr.style.height = "104px";
            for (var prop in obj) {
                if (prop === "id") continue;
                var td = Utils.ce("td");
                createTdContent(td, obj, prop);
                tr.appendChild(td);
            }
            parent.appendChild(tr)
        }
    }

    function createTdContent(td, obj, prop) {
        switch (prop) {
            case "selected":
                var ck = Utils.ce("input");
                ck.type = "checkbox";
                td.appendChild(ck);
                ck.obj = obj;
                ck.checked = obj[prop]
                ck.addEventListener("click", selectHandler);
                td.style.paddingLeft = "10px";
                break;
            case "icon":
                var img = new Image();
                img.src = obj[prop];
                img.style.width = "70px";
                img.style.height = "70px";
                td.appendChild(img);
                break;
            case "price":
            case "sum":
                td.textContent = "￥" + Number(obj[prop]).toFixed(2);
                td.style.textAlign = "center";
                break;
            case "del":
                var a = Utils.ce("a");
                a.href = "javascript:void(0)";
                a.textContent = "删除";
                a.obj = obj;
                a.style.color="#333";
                a.addEventListener("click", delClickHandler);
                td.appendChild(a);
                td.style.textAlign = "center";
                break;
            
            default:
                td.textContent = obj[prop];
                td.style.textAlign = "center";
        }
    }


    function createFoot() {
        if(divCon){
            divCon.remove();
            divCon = null;
        }
         divCon = Utils.ce("div", {
            border: "1px solid #eaebec",
            fontSize: '14px',
            height: '70px',
            lineHeight: '70px',
            position: 'relative',
            textIndent: '10px',
            width: "1020px",
            backgroundColor: "white",
            margin:"15px auto"
        });
        createChecks(divCon);
        creatDelshop(divCon);
        createSum(divCon);
        createSubmit(divCon);
        cartCon.appendChild(divCon);
    }
    function createChecks(parent) {
        var ck=Utils.ce("input",{
            marginLeft: "6px",
        });
        ck.type="checkbox";
        ck.checked=data.every(item=>item.selected);
        ck.addEventListener("click",selectHandler);
        parent.appendChild(ck);
        var span=Utils.ce("span",{
            textIndent: "4px",
            color: "#333",
            fontWeight: "700"
        })
        span.textContent="全选";
        parent.appendChild(span);
    }
    function creatDelshop(parent) {
        var a=Utils.ce("a",{
            cursor: "pointer",
            marginLeft: "20px"
        })
        a.textContent="删除选中商品";
        a.addEventListener("click",deleteClickHandler);
        parent.appendChild(a)
    }
    function createSum(parent) {
        var div=Utils.ce("div",{
            position: "absolute",
            right: "260px",
            textAlign: "right",
            top: "15px",
        })
        var p=Utils.ce("p",{
            fontSize: "16px",
            lineHeight: "20px",
        })
        var span1=Utils.ce("span");
            span1.textContent="已选择";
            var span2=Utils.ce("span",{
                color:" #F33",
                fontSize: "14px"
            });
            span2.textContent=data.filter(item=>item.selected).length;
            var span3=Utils.ce("span");
            span3.textContent="件商品";
            p.appendChild(span1);
            p.appendChild(span2);
            p.appendChild(span3);
        var b=Utils.ce("b",{
            color: "#f33",
            fontSize: "14px",
            fontWeight: "700",
            margin:"5px",
        })    
        b.textContent="合计";
        var span3=Utils.ce("span",{
            marginLeft:"5px"
        });
        span3.textContent="￥"+data.reduce((value,item)=>{
            if(item.selected) return value+item.sum;
            return value;
        },0).toFixed(2);
        b.appendChild(span3);
        p.appendChild(b);
        div.appendChild(p);
        parent.appendChild(div);

    }
    function createSubmit(parent) {
        var a=Utils.ce("a")
        a.className="submit-cart";
        a.textContent="去结算";
        parent.appendChild(a);
    }
    function delClickHandler(e){
        var a=e.currentTarget;
          var id=a.obj.id;
        data=data.filter(item=>{
            return id!==item.id;
        });
        localStorage.shoppingList=JSON.stringify(data);
        createTable();
    }
    function deleteClickHandler(e){
        if(e.currentTarget.textContent==="删除选中商品"){
            data=data.filter(item=>{
                return !item.selected;
            });
        }
        localStorage.shoppingList=JSON.stringify(data);
        createTable();
    }

    function stepChangeHandler(e){
          var id=e.obj.id;
          var num=e.step;
         data.forEach(item=>{
             if(item.id===id){
                 item.num=num;
                 item.sum=num*item.price;
             }
         });
         
         createTable();
      }

      function selectHandler(e) {
        var ck = e.currentTarget;
        if (ck.obj) {
            ck.obj.selected = ck.checked;
        } else {
            data.forEach(item => {
                item.selected = ck.checked;
            });
        }
        createTable();
    }
})()