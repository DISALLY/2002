import Utils from "./Utils.js";
export default class GoodsItem{
    elem;
    constructor(data){
        this.elem=this.createElem(data);
    }
    appendTo(parent){
        if(typeof parent==="string"){
            parent=document.querySelector(parent);
        }
        parent.appendChild(this.elem);
    }
    createElem(data){
        var div = Utils.ce("div");
        div.className = "goodsCon";
        var a=Utils.ce("a");
        a.href=data.href;
        a.target="_blank";
        div.appendChild(a);
        this.createIcon(a, data.icon);
        this.createTitle(a, data.title);
        this.createInfo(a, data.info, data.selfSell);
        this.createPriceCon(div, data);
        return div;
    }
    createIcon(parent, iconPath) {
        var img = new Image();
        img.src = iconPath;
        img.className = "icon";
        parent.appendChild(img);
      }

      createTitle(parent, title) {
        var h4 = Utils.ce("h4");
        h4.className = "title";
        h4.textContent = title;
        parent.appendChild(h4);
      }

      createInfo(parent, info, selfSell) {
        var div = Utils.ce("div");
        if (selfSell) {
          var img = new Image();
          img.src = "./img/self.png";
          div.appendChild(img);
        }
        var text = document.createTextNode(info);
        div.appendChild(text);
        div.className = "info";
        parent.appendChild(div);
      }

      createPriceCon(parent, data) {
        var div = Utils.ce("div");
        div.className = "priceCon";
        this.createHistory(div, data.history);
        this.createPrice(div, data.price, data.oldPrice);
        this.createsold(div, data.sold);
        this.createButton(div, data.href);
        parent.appendChild(div);
      }

      createHistory(parent, history) {
          if(history.trim().length===0)  return;
        var div = Utils.ce("div");
        div.textContent = history;
        div.className = "history";
        parent.appendChild(div);
      }
      createPrice(parent, price, oldPrice) {
        var priceDiv = Utils.ce("span");
        priceDiv.textContent = "￥" + price;
        priceDiv.className = "price";
        var oldPriceDiv = Utils.ce("span");
        oldPriceDiv.textContent = "￥" + oldPrice;
        oldPriceDiv.className = "oldPrice";
        parent.appendChild(priceDiv);
        parent.appendChild(oldPriceDiv);
      }

      createsold(parent, sold) {
        var div = Utils.ce("div");
        var soldText = Utils.ce("span");
        soldText.textContent = `已售${sold * 100}%`;
        soldText.className = "soldText";
        div.appendChild(soldText);
        var soldSpan = Utils.ce("span");
        var soldRed = Utils.ce("span");
        soldSpan.className = "soldSpan";
        soldRed.style.width = 88 * sold + "px";
        soldSpan.appendChild(soldRed);
        div.appendChild(soldSpan);
        parent.appendChild(div);
      }
      createButton(parent, href) {
        var a = Utils.ce("a");
        a.href = href;
        a.textContent = "立即抢购";
        a.className = "button";
        a.target="_blank";
        parent.appendChild(a);
      }
}