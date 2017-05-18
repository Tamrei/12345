import {trigger, state, animate, style, transition, keyframes} from '@angular/core';

export function routerTransition(param) {
    if (param) {
        return slideToLeft();
    } else {
        return slideToRight();
    }

    //return queryAnim();
}

export function slideTransition() {
    return slide();
    //return scalseRouter();
}

export function routerTransitionRight() {
    return slideToRight();
}

export function opacityTransition() {
    return opacity();
}

export function slideTest() {
    return slide();
}

export function slideLeft() {
    //return slide2();
    return scalseRouter();
}

export function slideTest2() {
    //return slide3();
    return scalseRouter();
}

export function scale() {
    return scalseRouter();
}

function scalseRouter() {
    return trigger('routerTransition', [  //'slideTest2', [
        // state('void', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        // state('*', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        state('void', style({
            'background-color': 'white',
            'bottom':'0',
            'position':'fixed',
            'top':'0',
            'width':'100%',
            'animation-fill-mode': 'both;'})),
        state('*', style({
            'background-color': 'white',
            'bottom':'0',
            'position':'fixed',
            'top':'0',
            'width':'100%',
            'animation-fill-mode': 'both'})),
        transition(':enter', [
            style({ transform: 'scale3d(.0, .0, .0)', opacity: '0'}),
            animate('0.4s ease-in-out', style({ transform: 'scale3d(.3, .3, .3)', opacity: '1'}))
        ]),
        transition(':leave', [
            style({ transform: 'scale3d(.3, .3, .3)'}),
            animate('0.4s ease-in-out', style({ transform: 'scale3d(.0, .0, .0)'}))
])
    ]);
}

function slide() {
    return trigger('routerTransition', [  //'slideTest2', [
        // state('void', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        // state('*', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        state('void', style({
            'overflow-x': 'hidden',
            'background-color': '#303440',
            'bottom':'0',
            'position':'absolute',
            'top':'0',
            'width':'100%',
            })),
        state('*', style({
            'overflow-x': 'hidden',
            'background-color': '#303440',
            'bottom':'0',
            'position':'absolute',
            'top':'0',
            'width':'100%',
            })),
        transition(':enter', [
            style({transform: 'translateY(100%)', /*opacity: '0'*/}),
            animate('0.4s ease-in-out', style({transform: 'translateY(0%)', /*opacity: '1'*/})),
            //animate('0.2s ease-in-out', style({opacity: '1'}))
        ]),
        transition(':leave', [
            // style({transform: 'translateY(0%)', /*opacity: '1'*/}),
            // animate('0.4s ease-in-out', style({transform: 'translateY(100%)', /*opacity: '0'*/})),

            style({'opacity': 1}),
            animate('200ms ease-in-out', style({opacity: 0}))
        ])
    ]);
}

export function slideToRight() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        state('*', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        transition(':enter', [
            style({transform: 'translateY(-100%)', opacity: '0'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(0%)', opacity: '1'})),
            //animate('0.2s ease-in-out', style({opacity: '1'}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0%)', opacity: '1'}),
            animate('0.5s ease-in-out', style({transform: 'translateY(-100%)', opacity: '0'})),
            //animate('0.2s ease-in-out', style({opacity: '0'}))
        ])
    ]);
}


function opacity() {
    return trigger(
        'opacityTransition', [
            transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({'opacity': 1}),
                    animate('500ms', style({opacity: 0}))
                ])
        ]);
}




// max-width: 460px;
// margin: auto;


// export function queryAnim() {
//     return trigger('routerTransition', [
//         state('void', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
//         state('*', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
//         transition('/home => /about', [
//             query('$previous', [
//                 // animate the old page in
//             ]),
//             query('$next', [
//                 // animate the new page in
//             ])
//         ]),
//         // capturing a backwards motion
//         transition('/about <= /forums',[
//             query('$previous', [
//                 // animate the old page in
//             ]),
//             query('$next', [
//                 // animate the new page in
//             ])
//         ])
//     ]);
// }

export function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        state('*', style({position: 'fixed', width: '100%', maxWidth: '460px', margin: 'auto'})),
        transition(':enter', [
            style({transform: 'translateX(100%)', opacity: '0'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(0%)', opacity: '1'})),
            //animate('0.2s ease-in-out', style({opacity: '1'}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0%)', opacity: '1'}),
            animate('0.5s ease-in-out', style({transform: 'translateX(-100%)', opacity: '0'})),
            //animate('0.2s ease-in-out', style({opacity: '0'}))
        ])
    ]);
}
export function scaleIframe() {
        return trigger('scaleIframe', [  //'slideTest2', [
            state('void', style({
                'position': 'fixed',
                'width': '100%',
                //'background-color': '#303440'
            })),
            state('*', style({
                'position': 'fixed',
                'width': '100%',
            })),
            transition(':enter', [
                style({ transform: 'scale(0)', background: '#303440', 'transition': '1s'}),
                animate('0.4s ease-in-out', style({ transform: 'scale(1)', background: 'red'}))
            ]),
            transition(':leave', [
                style({ opacity: '1'}),
                animate('0.5s ease-in-out', style({opacity: '0'}))
            ])
        ]);
    }