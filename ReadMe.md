## Structure

### Analayse

Tri> CASE00 || CASE01 || CASE11 >json

### Storage

json>fn>mongo

## signup

generate base 64= K0OI2WPkVW0Su8DO0bcQhtht
generate verifytokendate = new date()+7days
user > db + (token,verifytokendate,verified=false)

send email=> <a href="http://localhost:3017/K0OI2WPkVW0Su8DO0bcQhtht">click here</a> to verify your account!

get request /:token => fn()=>{
token, new date
compare with token,verifytokendate
if(compare=ok)verified=true
else cantrou
}
