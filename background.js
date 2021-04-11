var solution_id;
var prob, contest;

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var url = details.url ;
        if( url.split("?")[0]=="https://www.codechef.com/api/ide/submit"){
        solution_id = url.split("=")[1];
        console.log(solution_id);
        
        }
        console.log(details);
    },
    {urls: ["<all_urls>"]}
);

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    // console.log(request.contestCode+" "+request.problemCode);
    contest = request.contestCode;
    prob = request.problemCode;
    checkResult();
  });
 
// var ansurl = 'https://www.codechef.com/error_status_table/'+ solution_id + '/';

function checkResult() {
 
    $.ajax({
 
        url: "https://www.codechef.com/api/ide/submit?solution_id="+ solution_id,
 
        dataType: "json",

        success: function(r){
            if(r.result_code!="wait"){
            var s=r.result_code;
			var n=r.time;
            var a=r.score;
            var e=r.signal;
            // console.log(s);
            var ver={
                type: "list",
                title: contest,
                message: prob,
                items: []
              }
             
              switch(s){
                case"partial_accepted": ver.items.push({title: "Verdict: ", message: "Partially Accepted!!"});
                                        ver.items.push({title: "Score: ", message: String(a)});
                                        ver.items.push({title: "Time: ", message: String(n)+"s"}); 
                                        break;
								
                case"accepted":		ver.items.push({title: "Verdict: ", message: "Accepted!!"});                                        
                                        ver.items.push({title: "Score: ", message: String(a)});
                                        ver.items.push({title: "Time: ", message: String(n)+"s"});  
                                        break;

                case"wrong":		ver.items.push({title: "Verdict: ", message: "Wrong!!"});                                                                                
                                        ver.items.push({title: "Score: ", message: String(a)});
                                        ver.items.push({title: "Time: ", message: String(n)+"s"});
                                        break;

                case"time":		ver.items.push({title: "Verdict: ", message: "Time Limit Exceeded!!"});
                                        break;

                case"runtime":		ver.items.push({title: "Verdict: ", message: "Runtime Error("+e+")!!"});
                                        break;
                
                case"compile":		ver.items.push({title: "Verdict: ", message: "Compilation Error!!"});                                        
                                        break;

                case"score":		ver.items.push({title: "Verdict: ", message: "Insufficient Score!!"});                                        
                                        break;

                case"error":		ver.items.push({title: "Verdict: ", message: "Internal Error!!"});                                        
                                        break;
              }

              chrome.notifications.create(String(prob),ver);
        }
        },
 
        error: function(){setTimeout(checkResult,4000);}
    });
}
