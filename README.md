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

### Git Flow
- master
- release : 최종 master로 merge.
     + 최종검수 및 수정사항들에 대한처리 후 master와 develop에 merge
- develop : master에서 가져온 branch
- feature : local작업 후 develop에 merge

### 작업순서
1. 본인 branch를 만든다.
    >   
        git branch <branchname>
2. 만들어진 branch로 이동
    >   
        git checkout <branchname>
3. 아래 명령어로 현재 브랜치 위치 확인 (현재브랜치에 * 표시가 됨.)
    - Git Bash를 쓰면 현재 브랜치 위치를 쉽게 알 수 있다.
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
6. 브랜치를 develop로 변경 후 브랜치를 합친다.
    >   
        git checkout develop
        git merger <branchname>
7. develop에서 최종 push 해서 git에 반영.
8. 반영후 develop => release로 merge `*release : git merge develop`
9. 만약 release에 최종검수시 수정사항이 있다면 수정 후 develop에 merge
10. 최종 release는 master로 pull request.
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
    
### React 라이프싸이클
> https://velopert.com/3631
#### 컴포넌트 초기생성
-  `componentDidMount()`
    + 컴포넌트가 만들어지고 `render`가 호출된 이후에 호출되는 메소드.
    + 주로 D3, masonry 처럼 DOM 을 사용해야하는 외부 라이브러리 연동을 하거나, 해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나, DOM 의 속성을 읽거나 직접 변경하는 작업을 진행

#### 컴포넌트 업데이트
- `componentWillReceiveProps(nextProps)`
    + 컴포넌틑 생성후 첫 렌더링을 마친 후 호출되는 메소드
    + 컴포넌트가 처음 마운트 되는 시점에서는 호출되지 않는다.
    + `props`를 받아서 `state`를 변경해야 하는 경우 유용하다.
    + 이 메소드는 내부에서 `setState`를 사용해도 추가적인 렌더링이 발생하지 않는다.
    +  v16.3 부터 deprecate 됩니다. v16.3 부터는 UNSAFE_componentWillReceiveProps() 라는 이름으로 사용된다.
- `static getDerivedStateFromProps()`
    + 이 함수는, v16.3 이후에 만들어진 라이프사이클 API 인데요, 이 API 는 props 로 받아온 값을 state 로 동기화 하는 작업을 해줘야 하는 경우에 사용된다.
- `shouldComponentUpdate(nextProps,nextState)`
    + 이 API 는 컴포넌트를 최적화하는 작업에서 매우 유용하게 사용된다.
    + 쓸대없이 낭비되고 있는 이 CPU 처리량을 줄여주기 위해서 우리는 Virtual DOM 에 리렌더링 하는것도,불필요할경우엔 방지하기 위해서 shouldComponentUpdate 를 작성한다.
    + 컴포넌트 업데이트 직전에 호출되는 메소드.
    + `props` 또는 `state`가 변경되었을 때, 재랜더링을 여부를 retrun값으로 결정한다.
-  `componentWillUpdate(nextProps, nextState)`
    + 컴포넌트 업데이트 직후에 호출되는 메소드.
    + 이 API 또한 v16.3 이후 deprecate 된다. 기존의 기능은 getSnapshotBeforeUpdate 로 대체 될 수 있음.
- `getSnapshotBeforeUpdate()`
    + 이 API 가 발생하는 시점은 다음과 같음.      
      - render()
      - getSnapshotBeforeUpdate()
      - 실제 DOM 에 변화 발생
      - componentDidUpdate
    + 이 API를 통해서, DOM 변화가 일어나기 직전의 DOM 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate 에서 3번째 파라미터로 받아올 수 있게 된다.
- `componentDidUpdate`
    + render() 를 호출하고난 다음에 발생.
    + 이 시점에선 this.props 와 this.state 가 바뀌어있음. 
    + 파라미터를 통해 이전의 값인 prevProps 와 prevState 를 조회 할 수 있음.
    + getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아온다.
    
#### 컴포넌트 제거
- `componentWillUnmount()`
    + 컴포넌트가 소멸된 시점에(DOM에서 삭제된 후) 실행되는 메소드.
    + 컴포넌트 내부에서 타이머나 비동기 API를 사용하고 있을때, 이를 제거하기에 유용하다.
    + 여기서는 주로 등록했었던 이벤트를 제거하고, 만약에 setTimeout 을 걸은것이 있다면 clearTimeout 을 통하여 제거를 함. 추가적으로, 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose 기능이 있다면 여기서 호출해주시면 된다.
    
    ![Alt text](https://pbs.twimg.com/media/DZ-97vzW4AAbcZj.jpg)