var problem = document.querySelector("div.run-details-info").innerText;
            var contestCode = problem.split(" ")[1].split(":")[1];
            var problemCode = problem.split(":")[2];

chrome.runtime.sendMessage({contestCode: contestCode, problemCode: problemCode});
// console.log(contestCode+" "+problemCode);