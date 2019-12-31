# SAI (SsgAnimationIndex)

### Tutorial
- Markdown : https://guides.github.com/features/mastering-markdown/
- React : https://www.w3schools.com/REACT/default.asp
- TweenMax : https://greensock.com/docs/

<hr />

### 주제
 - [x] ES6
 - [x] React
 - [x] TweenMax
 - [x] CSS

<hr />

 ### Setting
 > 
    git init
    git clone https://github.com/alexsando86/SATF.git
    npm install
    npm install -g yarn
 > 
    npm install -g create-react-app
    npm install react-gsap
    yarn add node-sass sass-loader
 > 
    yarn start
    
### sass-loader 커스터마이징
1. create-react-app으로 만든 프로젝트는 구조의 복잡도를 낮추기 위하여 세부설정이 숨어있습니다.
2. 이를 커스터마이징 하기 위해서는 yarn eject 명렁어를 통하여 세부설정을 밖으로 빼내야 합니다.
3. create-react-app 으로 만든 프로젝트는 기본적으로 .git 설정도 되어있는데요, yarn eject 는 아직 git 에 커밋되지 않은 변화가 있다면 진행이 되지 않으니, 먼저 커밋을 해주어야 합니다.
> 
    yarn eject
    
> 이번프로젝트에서는 yarn eject 하지 않음.

<hr />

### TweenMax
- Install: https://greensock.com/docs/v3/Installation#npm

### 작업순서
1. 본인 branch를 만든다.
    >   
        git branch <branchname>
2. 만들어진 branch로 이동
    >   
        git checkout <branchname>
3. 아래 명령어로 현재 브랜치 위치 확인 (현재브랜치에 * 표시가 됨.)
    >   
        git branch
4. 확인 완료 되면 해당 브랜치에서 작업을 진행.
5. 작업 완료 후 아래와 같이 작업을 commit -p 한다.
    - Stage this hunkpy,n,q,a,d,s,e]? 
        + y:hunk를 스테이지에 올림
        + n:hunk를 스테이지에 올리지않음
        + q:종료
    >   
        git add -p
        git commit -m "commit message"
        
<hr />

### Git Tutorial
- https://backlog.com/git-tutorial/kr/
- https://learngitbranching.js.org/
##### 브랜치 만들기
>   
    git branch <branchname>
##### 브랜치 전환하기
>   
    git checkout <branchname>
##### 브랜치 병합하기
>   
    git checkout master
    git merge <branchname>

##### repository 내 모든 수정 되돌리기 ( git add 명령하기 전 )
>   
    git checkout .
    
##### git add 명령으로 stage에 올린 경우
>   
    git reset