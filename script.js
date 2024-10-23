const canvas=document.querySelector('canvas')
const context=canvas.getContext('2d');

const frames={
    currentIndex:0,
    maxIndex:382
}
let imageLoaded = 0
const images=[]
function preloadImages(){
    for(var i=0;i<=frames.maxIndex;i++){
        const imageUrl=`./frames/frame_${(i+1).toString().padStart(4,0)}.jpeg`
        const image=new Image()
        image.src=imageUrl
        image.onload=()=>{
            imageLoaded++
            if(imageLoaded===frames.maxIndex){
                loadImage(frames.currentIndex)
                startAnimation()
            }
        }

        images.push(image)
    }
}

function loadImage(index){
    if(index>=0 && index<=frames.maxIndex){
        const img=images[index]

        canvas.height=window.innerHeight
        canvas.width=window.innerWidth
        
        const scaleX=canvas.width / img.width
        const scaleY=canvas.height / img.height

        const scale=Math.max(scaleX,scaleY)

        const newwidth=img.width*scale
        const newheight=img.height*scale

        const offsetX=(canvas.width-newwidth)/2
        const offsetY=(canvas.height-newheight)/2

        context.clearRect(0,0,canvas.width,canvas.height)
        context.imageSmoothingQuality='high'
        context.imageSmoothingEnabled=true
        context.drawImage(img, offsetX, offsetY,newwidth,newheight)
        frames.currentIndex=index
    }
}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent", // Corrected 'tigger' to 'trigger'
            start: "top top",
            scrub: 2,
            markers: true,
            yoyo:true
        }
    });
    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex));
        }
    });
}
preloadImages()