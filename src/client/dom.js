module.exports = selector=>{
    const result = Array.from(document.querySelectorAll(selector));
    return !result ? [] : result.length==1 ? result[0] : result;
}