export const Addreqdate=(req,res,next)=>
{
req.currentDate=new Date();
console.log(req.currentDate);
next();
  }
export const printdateforget = (req, res, next) =>
    {
        if (req.method === "GET") {
            console.log(req.currentDate);
        }
        next();
    };
    
