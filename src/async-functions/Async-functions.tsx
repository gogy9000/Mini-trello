
export const fakeAxios = async () => {
  return new Promise((resolve)=>{
      let obj= {name:'Alex', age:32}
      setTimeout(()=>resolve(obj), 2000)
  })
}