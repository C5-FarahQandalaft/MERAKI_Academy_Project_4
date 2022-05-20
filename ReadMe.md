<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653042711/Logo_lhx0b3.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Seeker</h3>

---

<p align="center"> Post your job, find a job, all on Seeker.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Guided By](#guided_by)

## 🧐 About <a name = "about"></a>

Are you an employee looking for a job? or you are employer looking to hire efficient employee? the answer is Seeker.
Seeker is a job search site. Cares to put job seekers first, giving them free access to search for jobs, apply to jobs, and research companies.
Also it helps employers to share their job opportunities in simple and efficient way.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

<ul> 
<li>Google Chrome follow this <a href="https://www.google.com/chrome/?brand=YTUH&gclid=Cj0KCQjw-JyUBhCuARIsANUqQ_J7AcKOz_ZB4YBpjpv4KM1TS3p0O6WgYN8FuyxB-V4yyJBH6I-KpKYaAme7EALw_wcB&gclsrc=aw.ds/">link </a> to install. </li>
<li>Visual Studio Code follow this <a href="https://code.visualstudio.com/">link </a> to install. </li>
<li>Git Bash follow this <a href="https://git-scm.com/downloads">link </a> to install.</li>
<li>MongoDB follow this <a href="https://www.mongodb.com/try/download/community/">link </a> to install.</li> 
<li>Node.js follow this <a href="https://nodejs.org/en/">link </a> to install. </li>
</ul>

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone repo to your local machine using git bash

```
git clone https://github.com/C5-FarahQandalaft/MERAKI_Academy_Project_4.git
```

2. Install packages repeat this step in backend and frontend folders

```
npm i or npm install
```

3. Create .env file and put inside it DB_URI and SECRET

```
DB_URI=mongodb://localhost:27017/DB_Seeker
SECRET=Seeker
```

4. Run server inside backend folder using git bash

```
npm run dev
```

5. Run application inside front folder using git bash

```
npm start
```

<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653054982/Screenshot_2_gpildl.png" alt="Result backend">
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653054982/Screenshot_3_shjgbk.png" alt="Result frontend">

## 🎈 Usage <a name="usage"></a>

1.Home tab to view the home section
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653054982/Screenshot_1_byosh6.png" alt="Result site">
<br>
2.If you clicked on Join us or Register tab it will take you the Register page
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653058254/Register_kks81i.png" alt="Result site">
<br>
3.About tab show what is this site for and who build it
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653058354/about_hvgret.png" alt="Result site">
<br>
4.Search tab you don't have to register to search and view jobs
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653059562/search_fzlsq7.png" alt="Result site">
<br>
5.You can filter your search (Orange arrow) using the search bar or the selectors
<br> 6. if you clicked on view job (green arrow) it will show you more information about the job and view comments
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653059698/search_desc_bhn0w1.png" alt="Result site">
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653059992/view_job_an4zay.png" alt="Result site">
<br>
7.You can't write comment or apply to job unless you register
<br> 8. You can register as Employee or Employer.
Employer :
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653060200/register_as_employer_xt5oij.png" alt="Result site">
<br>
Employee :
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653060200/employee_register_a8ht6x.png" alt="Result site">
<br>

9.Login tab log into the website to post or apply to job
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653060602/login_uyqzii.png" alt="Result site">
<br>

10.after login as Employee you can click Apply to job <br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653062433/apply_to_job_rqpnk7.png" alt="Result site">
<br>
11.You can click withdraw job tab to delete your job application <br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653062632/delete_app_ukihrp.png" alt="Result site">
<br>

12.You can now click View job and and add a comment by clicking the button with arrow (as employer too)
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653062865/comment_ioh2uk.png" alt="Result site">
<br>
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653062865/commented_nykocq.png" alt="Result site">
<br>

13.You can edit or delete your comment now (blue arrow - edit), (red arrow - delete)<br>
14.When clicking on update the comment border will change to red and when you finish editing and click again on update the comment will updated (as employer too)<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063280/comment_buttons_aof16y.png" alt="Result site">
<br>
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063280/comment_updated_maohbn.png" alt="Result site">
<br>
15.Applications tab will show you the jobs you applied for<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063528/Applications_mi0kuc.png" alt="Result site">
<br>

16.Logout tab will sign you out from the account and take you to home page<br>

17.after login as Employer you can click Create post tab <br>
with image:<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063759/create_post_with_image_h28fft.png" alt="Result site">
<br>
without image: <br>
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063759/Create_post_section_yoeroz.png" alt="Result site">
<br>

18.You can edit or delete your post now (blu arrow - edit), (red arrow - delete)<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653063936/employer_kzcdj1.png" alt="Result site">
<br>
update page:<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653064025/update_page_dpdabt.png" alt="Result site">
<br>

19.You can view posts and delete any comment on your posts <br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653064169/delete_comment_wt1ykj.png" alt="Result site">
<br>

20.You can click My jobs tab to view the jobs you posted <br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653064290/my_jobs_c2jkzo.png" alt="Result site">
<br>
21.You can click Contact us tab in footer to view how to contact with the site owners or developers
<br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653064734/contact_us_ahhtjc.png" alt="Result site">
<br>
sending message : <br>
<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653064734/message_sent_kpxzxy.png" alt="Result site">
<br>

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express JS](https://expressjs.com/) - Server Framework
- [React JS](https://https://reactjs.org/) - Web Framework
- [Node JS](https://nodejs.org/en/) - Server Environment

## User Story <a name = "user_story"></a>

- You can open my Trello <a href="https://trello.com/b/bim1m4Bz/project-4">link </a> to see how this project got developed.

## Data FLow <a name = "data_flow"></a>

<img width=400px height=200px src="https://res.cloudinary.com/dtiuiyrdu/image/upload/v1653068975/SCHEMAS_aojxiq.png" alt="data flow">

## ⚠️ Guided By <a name = "guided_by"></a>

This project is guided by ©️ **[MERAKI Academy](https://www.meraki-academy.org)**
