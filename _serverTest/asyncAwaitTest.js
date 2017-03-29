/*function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 3000);*/


async function printAsy(value,time){
	await timeout2(time)
	console.log(value)
}

function timeout2(time){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,time)
	})
}

printAsy('9秒后打印',9000)