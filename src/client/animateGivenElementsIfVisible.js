const ATTRIBUTE_CLASSES_IN = 'animate-in';
const DEFAULT_DELAY = 700;

const getClassesForDataAttribute = (attr,element)=>{
    if(!element){
        return [];
    }
    const value=element.getAttribute('data-'+attr);
    return !value ? [] : value.split(' ');
}

class AnimateGivenElementsIfVisible {

    constructor(elements,delay){
        this.delay = !delay ? DEFAULT_DELAY : delay;
        this.elements=elements;
        this.elements.forEach(element=>{
            element.classList.add('hidden');
        })
        const instance=this;
        const callScroll=evt=>{
            instance.onScroll();
        }
        window.addEventListener("load", callScroll);
        window.addEventListener("scroll", callScroll);
    }
    areAnimateInClassesAdded(element){
        const classes=getClassesForDataAttribute(ATTRIBUTE_CLASSES_IN,element);
        return classes.filter(className=>!element.classList.contains(className)).length!=0;
    }
    isElementVisible(element){
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    onScroll(){
        const elementsToAnimateIn = this.elements
            .filter(this.isElementVisible)
            .filter(this.areAnimateInClassesAdded);

        const addClass = (attr,element) =>{
            const classes = getClassesForDataAttribute(attr,element);
            if(typeof element != 'undefined'){
                element.classList.remove('hidden');
                element.classList.add('visible')
                classes.forEach(className=>{element.classList.add(className)});
            }
        }
        const instance = this;

        const delay = (element,index)=>{
            setTimeout(()=>{
                addClass(ATTRIBUTE_CLASSES_IN,element);
                if(index!=elementsToAnimateIn.length-1){
                    index++;
                    delay(elementsToAnimateIn[index],index);
                }

            },instance.delay);
        }
        if(elementsToAnimateIn.length==1){
            addClass(ATTRIBUTE_CLASSES_IN, elementsToAnimateIn[0]);
        }else{
            delay(elementsToAnimateIn[0],0);
        }
    }
}

module.exports = AnimateGivenElementsIfVisible;