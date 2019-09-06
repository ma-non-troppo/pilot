class Styled {
    constructor(message, style, ...args) {
        this.message = message;
        this.style = style;
        this.args = args;
    }

    print() {
        let style = this.style ? [this.style] : [];
        let args = this.args ? this.args : [];
        console.log.apply(console, [this.message].concat(style.concat(this.args)));
    }
}
class Step {
    constructor(groupName, items, behavior = (() => {})) {
        this.groupName = groupName;
        this.items = items;
        this.behavior = behavior;
    }

    print(depth = 0) {
        if(depth === 0) {
            console.clear();
        }

        this.behavior();

        let fontSize = 2 - depth * 0.2;
        console.group('%c' + this.groupName, `font-weight: bold;font-size: ${fontSize}em;`);
        this.items.forEach(item => {
            item.print(depth + 1);
        });
        console.groupEnd(this.groupName);
    }
}

class Steps {
    constructor() {
        this.cursor = 0;
        this.initSteps();
    }

    getCurrentStep() {
        return this.steps[this.cursor];
    }

    printCurrentStep() {
        this.getCurrentStep().print();
    }

    printAndIncrease() {
        if(this.cursor < this.steps.length) {
            this.printCurrentStep();
            this.cursor++;
        } else {
            console.log('%c모든 튜토리얼이 종료되었습니다.', 'font-weight:bold');
        }
    }

    initSteps() {
        this.steps = [
            new Step('우리가 4주 동안 배워볼 것들은 아래와 같아요.', [
                new Step('차수별 계획', [
                    new Styled('1. 개발, 프로그래밍 언어, 자바스크립트란 무엇인지?'),
                    new Styled('2. 자바스크립트의 기초적인 문법'),
                    new Styled('3. 함수 만들고 호출하기'),
                    new Styled('4. 자바스크립트에서 데이터를 다루는 방법'),
                ]),
                new Styled('사실 일주일에 1시간 30분씩 4번의 과정. 총 여섯 시간 동안 개발을 배우는 것은'),
                new Styled('쓸모있는 것을 만들어내기에는 부족한 시간이예요.'),
                new Styled('파일럿 과정이니 만큼 자바스크립트를 맛보는 정도로 생각해주시면 좋을 것 같습니다.')
            ]),

            new Step('본격적으로 수업에 들어가기에 앞서, 참여하게된 목적을 살펴볼게요.', [
                new Styled('%c개발자와 협업 시 원활한 커뮤니케이션', 'font-size: 2em'),
                new Styled('%c서비스의 이해를 위해', 'font-size: 1.7em'),
                new Styled('%c자기계발, 역량 강화', 'font-size: 1.3em'),
                new Styled('개발하고 싶은 것이 있어서'),
            ]),

            new Step('개발에 대한 오해와 이해', [
                new Styled('코딩에 대한 오해와 진실 - https://www.youtube.com/watch?v=aW9-pHDgOrI'),
                new Step('오래된 개발자 유우머', [
                    new Styled('어느 개발자가 퇴근길에 아내에게 전화를 걸었다.'),
                    new Styled(''),
                    new Styled('개발자 : 여보 나 지금 퇴근. 집에 가는 길에 마트 들를건데 뭐 사다 줄까?'),
                    new Styled('아내 : 우유 두 개 사와.'),
                    new Styled('개발자 : 그리고?'),
                    new Styled('아내 : 만약 마트에 달걀이 있으면 여섯 개 사다 줘.'),
                    new Styled(''),
                    new Styled('귀가한 개발자, 아내에게 우유 여섯 개를 건넨다.'),
                    new Styled(''),
                    new Styled('아내 : 왜 이렇게 우유를 많이 샀어?'),
                    new Styled('개발자 : 마트에 달걀이 있길래..'),
                ]),

                new Styled(''),

            ], () => {
                $('#instructionArea').fadeOut();
                $('#listing1').fadeIn();
            }),

            new Step('개발은, 개발자는', [
                new Styled('용어를 중요하게 생각한다.	'),
                new Styled('이름을 중요하게 생각한다.'),
                new Styled('읽기 좋은 코드를 좋아하고, 읽기 좋은 코드를 작성해야 한다.'),
                new Styled('꾸준히 공부해야한다.'),
                new Styled('프로그래밍 언어에는 귀천이 없다.'),
                new Styled('프로그래밍 언어는 융통성이 없다.'),
                new Styled('a 다르고 A 다르다'),
                new Styled('“1” 다르고 1다르다'),
                new Styled('논리적인 틈은 버그다'),
            ], () => {
                $('#listing1').fadeOut();
                $('#listing2').fadeIn();
            }),

            new Step('막간 토막 상식', [
                new Styled('버그(Bug)는 1945년 9월 9일, Grace Merray Hopper가 Mark II 컴퓨터에서 오류를 일으킨 나방을 지칭한 말입니다.'),
                new Styled('디버그(Debug): 소프트웨어의 버그를 없애는 일')

            ], () => {
                $('#listing2').fadeOut();
                $('#listing3').fadeIn();
            }),

            new Step('그래서 전공자는 무엇을 배웠을까?', [
                new Styled('수학 관련 과목: 대학 수학, 선형대수학, 공업수학, 이산수학, 수치해석..'),
                new Styled('프로그래밍 언어 2~3개 (C, Java, C++, Haskell)와 프로그래밍 언어론'),
                new Styled('데이터베이스, 운영체제, 알고리즘, 논리회로, 설계, 소프트웨어 공학, 소프트웨어 설계 및 실습 + 소프트웨어 프로젝트, 컴파일러, 임베디드 소프트웨어, 인공지능, 컴퓨터 그래픽, 정보보호, 문제 해결 기법,...'),
                new Styled('그리고 대학원의 전공'),
            ]),

            new Step('무작정 따라하기 세션', [], () => {
                $('#listing3').fadeOut();
                $('#listing4').fadeIn();
            }),

            new Step('실제 개발 비슷한 것을 해보아요', [], () => {
                $('#listing4').fadeOut();
                $('#listing5').fadeIn();
            }),
        ]
    }
}