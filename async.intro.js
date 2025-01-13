// supose i wanna 1 . validate a users pass and name then log in then display the page
const username = "me" , passward = "123";



// 1 . how it would be donw without callback and  promises

{
        const TokenOfValidation = ValidateApi(username , passward);
        LoginApi(username,passward,TokenOfValidation);
}

// this will not work since both of them are async calls and would be immidiately called 




// 2. with callback 

{

        // call of first api while pasisng it a calllback to call the second api
        ValidateApi(username,passward,(TokenOfValidation)=>{
                // callback one 
                LoginApi(username,passward,TokenOfValidation , (content)=>{
                        // callback two
                        DisplayContentApi(content);
                });
        });
        
        // // what validate api does 
        
        function ValidateApi(username,passward,callBack){
                // work ok validation 
                setTimeout(()=>{
                        callBack(username && passward)
                },5000);
        }

        function LoginApi(username,passward,TokenOfValidation,callBack){
                setTimeout(()=>{
                        if(username && passward && TokenOfValidation){
                                console.log("login successfull");
                                callBack(" :) " );
                        }
                        else 
                                console.log("login failed");
                },2000);
        }

        function DisplayContentApi(content){
                console.log("displaying content : ",content);
        }
        
}


 // 3 with promises

{
        // call of first api while pasisng it a calllback to call the second api
        ValidateApi(username,passward)
        .then((TokenOfValidation)=>{
                LoginApi(username,passward,TokenOfValidation)
                .then((content)=>{
                        DisplayApi(content);
                });
        });
        
        // this is promise hell again ehich can be avoided by using retrun 
        // to chain down the promise returned to use by second call 

        ValidateApi(username,passward)
        .then((TokenOfValidation)=>{
                return LoginApi(username,passward,TokenOfValidation);
        })
        .then((content)=>{
                DisplayApi(content);
        });
        
        
        // // what validate api does 
        
        function ValidateApi(username,passward){
                return new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                                if(username && passward) resolve("valid token");
                                else reject(null);
                        },5000);
                });
        }

        function LoginApi(username,passward,TokenOfValidation){
                return new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                                if(username && passward && TokenOfValidation)
                                        resolve("content");
                                else 
                                        reject(null);
                        },2000);
                });
        }
        
        function DisplayApi(content){
                console.log("content is : ",content);
        }

}