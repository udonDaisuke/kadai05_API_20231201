
let outfit_array = new Array(10)
console.log(1111)
// chk_1\
// $("#chk_1").change(function(){
    $(".test").change(function(){
        let num =(this.id)[4]
        console.log(num,this.checked)
        let img_id = `#item${num}`
        // initialization on chenge
        if(num>=2 && num<=4){
            $(item2).fadeOut(200);
            $(item3).fadeOut(200);
            $(item4).fadeOut(200);
        }

        if(num>=5 && num<=7){
            $(item5).fadeOut(200);
            $(item6).fadeOut(200);
            $(item7).fadeOut(200);
        }
        if(num>=8 && num<=9){
            $(item8).fadeOut(200);
            $(item9).fadeOut(200);
        }


        if(this.checked){
            console.log($(img_id))
            if(num==5||num==8){return}
            $(img_id).slideDown(400);
            // $(img_id).css("display","flex")
        }else{
            $(img_id).css("display","none")

        }

})

$("#submit").on("click",function(e){
    for(let i=1;i<=9;i++){
        console.log(`#item${i}`)
        let stat = $(`#item${i}`).css("display")
        if(stat=="none"){
            outfit_array[i]=0
        }else{
            outfit_array[i]=1
        }
    }
    let feeling = $("#taikan").val()
    if(outfit_array[2]==0&&outfit_array[3]==0&&outfit_array[4]==0){
    alert("スーパーAI(37)からの一言：服は着た方がいいです。")
    }else if(feeling <=2 || feeling>=4){
    alert("スーパーAI(37)からの一言：そんな装備で大丈夫か？")
    }else{
    alert("スーパーAI(37)からの一言：君が思うベストがそれなら、それでよいと思うのです。")

    }
})