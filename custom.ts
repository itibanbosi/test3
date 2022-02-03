/* plot_car Ver3.4*/

let wait = 0;
let Tugi_R = 0;
let Tugi_L = 0;
let T1 = 0;
let PremotionR = 0;
let PremotionL = 0;
let con_kaiten = 1.61;


enum pen_updown {
    up,
    down,
}
enum plotter_houkou {
    前,
    後,
}

enum plotter_RL {
    右,
    左,
}


enum microbit_LED {
    無効,
    有効,
}

enum houkou {
    右へ直角,
    左へ直角,
    ななめ右,
    ななめ左,
}
enum neoLED_color {
    白,
    赤,
    黄,
    緑,
    青,
    だいだい,
    あい,
    すみれ,
    紫,
    黒,
}

enum kyori {
    長い,
    短い,
}
enum sence_select {
    普通３０,
    高感度２０,
    低感度４０,
}
enum microbit_version {
    Version1,
    Version2,
    Test_A,
    Test_B,
    V1_Turbo,
    V2_Turbo,
}

enum onoff {
    ON,
    OFF,
}
enum whiteblack {
    黒,
    白,
}

let cond_Distance = 1;
let cond_degree = 1;
let microbit_wait = 750;

let Stepping = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let Stepping_non = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let Stepping1 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let SteppingF_0 = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
];
let SteppingF_1 = [
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
];
let SteppingF_2 = [
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
];
let SteppingF_3 = [
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
];

let SteppingB_0 = [
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
];
let SteppingB_1 = [

    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
];

let SteppingB_2 = [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
];
let SteppingB_3 = [

    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
];

let Stepping_R = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let Stepping_L = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

//LED不使用
led.enable(false)

pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P4, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P7, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)

let moter_number = 0;
let io_neo = neopixel.create(DigitalPin.P9, 4, NeoPixelMode.RGB);
io_neo.showRainbow(1, 360)
eureka_plotter_car.plottercar_pen(pen_updown.up)

//バージョンの判定
let first = input.runningTimeMicros()
let sum = 0
for (let index = 0; index < 1000; index++) {
    sum += 1
}
//basic.showNumber(input.runningTimeMicros() - first);
if ((input.runningTimeMicros() - first) < 2000) {
    microbit_wait = 5000;
    //    basic.showString("V2");

}
else {
    microbit_wait = 900;
    //    basic.showString("V1");
}


//% color="#3943c6" block="ﾌﾟﾛｯﾄｶｰVer3.4" weight=95 icon="\uf1b9"
namespace eureka_plotter_car {
    function moter(kyori: number, R_zengo: number, L_zengo: number) {
        led.enable(false);
        let i = 0;
        /* 端数の計算計算  */

        let kyori_hasuu = kyori % 1;
        serial.writeValue("kyori_hasuu", kyori_hasuu);
        let kyori_seisuu = Math.floor(kyori);
        /*    serial.writeValue("kyori_seisuu", kyori_seisuu);*/


        /* 前回の動作との比較と処理  */
        serial.writeValue("1Tugi_L", Tugi_L);
        if (PremotionR == R_zengo) {
            Tugi_R = Tugi_R + 1;
        }
        if (PremotionR > R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }
        if (PremotionR < R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }

        if (PremotionL == L_zengo) {
            Tugi_L = Tugi_L + 1;
        }
        if (PremotionL > L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }
        if (PremotionL < L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }


        /*   次のステップ*/
        Tugi_L = (Tugi_L) % 4;
        Tugi_R = (Tugi_R) % 4;

        /*右ステッピングの処理*/
        switch (R_zengo) {
            case 0:
                Stepping_R = Stepping_non;
                break;
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                break;
            case 1:

                if (Tugi_R == 0) {
                    Stepping_R = SteppingB_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingB_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingB_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingB_3
                }
                break;
            case 2:
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingF_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingF_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingF_3
                }
                break;

        }
        Stepping_L = SteppingF_0
        /*左ステッピングの処理*/
        switch (L_zengo) {
            case 0:
                Stepping_L = Stepping_non;
                break;
            case 1:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingF_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingF_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingF_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingF_3
                }
                break;
            case 2:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingB_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingB_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingB_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingB_3
                }
                break;
        }

        /*  バックラッシュの処理　右車輪 */
        if (PremotionR != R_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  バックラッシュの処理　左車輪 */
        if (PremotionL != L_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  整数部の処理　 */
        for (let index = 0; index < kyori_seisuu; index++) {
            let Data1 = 0;
            while (Data1 < 4) {

                pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                Data1 = Data1 + 1;
                for (i = 0; i < microbit_wait; i++);
                {
                }
            }
        }

        /* 端数分の進み方と処理  */
        let Step_number = Math.floor(kyori_hasuu * 10 / 2.5);
        let Data1 = 0;
        while (Data1 < Step_number) {
            serial.writeValue("Data1", Data1);
            pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
            pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
            pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
            pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
            pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
            pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
            pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
            pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
            Data1 = Data1 + 1;
            for (i = 0; i < microbit_wait; i++);
            {
            }
        }

        Tugi_L = (Tugi_L + Data1 - 1) % 4;
        Tugi_R = (Tugi_R + Data1 - 1) % 4;

        PremotionR = R_zengo;
        PremotionL = L_zengo;

    }


    //% color="#009CA0" weight=96 blockId=eureka_relay block="ペン |%mode| " group="1 ペンの状態"
    export function plottercar_pen(mode: pen_updown) {
        if (mode == pen_updown.down) {
            pins.servoWritePin(AnalogPin.P8, 0);
            basic.pause(1000);
        }
        if (mode == pen_updown.up) {
            pins.servoWritePin(AnalogPin.P8, 90);
            basic.pause(100);
        }
    }


    //% color="#3943c6" weight=80　blockId=plottercar_zengo
    //% block=" |%zengo|へ |%F_cm| ｃｍ進む" group="2　基本の動き"
    export function plottercar_zengo(zengo: plotter_houkou, F_cm: number): void {
        switch (zengo) {
            case plotter_houkou.前:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 1, 1);
                break;

            case plotter_houkou.後:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 2, 2);
                break;
        }
    }

    //% color="#3943c6" weight=76　blockId=plottercar_RL_cycle
    //% block="|%RorL| 回り　角度 |%L_degree| " group="2　基本の動き"
    export function plottercar_RL_cycle(RorL: plotter_RL, RL_degree: number): void {
        switch (RorL) {
            case plotter_RL.左:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 1, 2);
                break;
            case plotter_RL.右:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 2, 1);
                break;
        }
    }


    //% color="#ff4940" weight=71　blockId=plottercar_rest
    //% block="停止状態（電流ＯＦＦ）" group="2　基本の動き"
    export function plottercar_frest(): void {
        moter_number = 1;
        moter(moter_number, 0, 1);
    }

    //% color="#3943c6" weight=55　blockId=plottercar_R_step
    //% block="右車輪　|%R_step|ステップ |%houkou|方向" group="2　基本の動き"

    export function plottercar_R_step(R_step: number, houkou: plotter_houkou): void {
        moter_number = R_step;
        switch (houkou) {
            case plotter_houkou.前:
                moter(R_step / 4, 1, 0);
                return;
            case plotter_houkou.後:
                moter(R_step / 4, 2, 0);
                return;
        }
    }
    //% color="#3943c6" weight=58　blockId=plottercar_L_step
    //% block="左車輪 |%L_step|ステップ |%houkou|方向" group="2　基本の動き"
    export function plottercar_L_step(L_step: number, houkou: plotter_houkou): void {
        moter_number = L_step;
        switch (houkou) {
            case plotter_houkou.前:
                moter(L_step / 4, 0, 1);
                return;
            case plotter_houkou.後:
                moter(L_step / 4, 0, 2);
                return;
        }
    }



    //% color="#3943c6" weight=72　blockId=plottercar_houkou
    //% block="ほうこうを変える |%muki| へ " group="2　基本の動き"
    export function plottercar_houkou(muki: houkou): void {
        switch (muki) {
            case houkou.右へ直角:
                return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.右, 90);
            case houkou.左へ直角:
                return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.左, 90);
            case houkou.ななめ右:
                return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.右, 45);
            case houkou.ななめ左:
                return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.左, 45);
        }
    }



    //% color="#009A00" weight=40　blockId=polygon
    //% block="多角形作図 |%digree_step| 角形　一辺の長さ |%Edge_Num|cm  |%RorL|回り " group="3　図形"
    export function polygon(digree_step: number, Edge_Num: number, RorL: plotter_RL): void {
        switch (RorL) {
            case plotter_RL.右:
                for (let index = 0; index < digree_step; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.前, Edge_Num)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.右, 360 / digree_step)
                }
                break;
            case plotter_RL.左:
                for (let index = 0; index < digree_step; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.前, Edge_Num)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.左, 360 / digree_step)
                }
                break;
        }
    }


    //% color="#009A00" weight=39　blockId=cycle
    //% block="円の作図 直径 |%D_Num|cm  |%RorL|回り" group="3　図形"
    export function cycle(D_Num: number, RorL: plotter_RL): void {
        let cir = D_Num * 3.14
        let Foward_D = cir / 30
        switch (RorL) {
            case plotter_RL.右:
                for (let index = 0; index < 30; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.前, Foward_D)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.右, 360 / 30)
                }
                break;
            case plotter_RL.左:
                for (let index = 0; index < 30; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.前, Foward_D)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.左, 360 / 30)
                }

        }
    }



    //% color="#ff3d03" weight=34 blockId=Microbit_Version_info block="ﾏｲｸﾛﾋﾞｯﾄのバージョンを設定する |%Version_info| にする" group="4 初期設定"
    export function microbit_version_info(Version_info: microbit_version) {
        switch (Version_info) {
            case microbit_version.Version1:
                microbit_wait = 900;
                break;
            case microbit_version.Version2:
                microbit_wait = 5000;
                break;
            case microbit_version.Test_A:
                microbit_wait = 10000;
                break;
            case microbit_version.Test_B:
                microbit_wait = 90000;
                break;
            case microbit_version.V1_Turbo:
                microbit_wait = 600;
                break;
            case microbit_version.V2_Turbo:
                microbit_wait = 2500;
                break;


        }
    }



    //% color="#ff3d03" weight=35 blockId=auto_led_off block="ﾏｲｸﾛﾋﾞｯﾄのLEDを |%Matrix_LED| にする" group="4 初期設定"
    export function auto_led_off(Matrix_LED: microbit_LED) {
        switch (Matrix_LED) {
            case microbit_LED.無効:
                led.enable(false);
                break;
            case microbit_LED.有効:
                led.enable(true);
        }
    }






    //% color="#ffa800" weight=20　blockId=plotter_Distance
    //% block="進行距離調整(1→1/1000)  短く |%Dis| 長く" group="5 調整"
    //% Dis.min=-30 Dis.max=30
    export function plotter_Distance(Dis: number): void {
        cond_Distance = (1 + Dis / 1000);
    }

    //% color="#ffa800" weight=18　blockId=plotter_degree
    //% block="回転角度調整（1→1/1000）  少なく回転 |%Deg| 多く回転" group="5 調整"
    //% Deg.min=-30 Deg.max=30
    export function plotter_degree(Deg: number): void {
        cond_degree = (1 + Deg / 1000);
    }






    //% color="#009A00" weight=22 blockId=sonar_ping_2 block="きょりｾﾝｻ" group="6 超音波きょりｾﾝｻｰ"
    //% advanced=true
    export function sonar_ping_2(): number {
        let d1 = 0;
        let d2 = 0;

        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d2 + d1;
        }
        return Math.round(Math.idiv(d2 / 5, 58) * 1.5);
    }

    /*
        //% color="#009A00" weight=21 blockId=sonar_ping_LED block="きょりを表示（確認のみ）" group="6 超音波きょりｾﾝｻｰ"
        //% advanced=true
        export function sonar_ping_LED() {
            basic.showNumber(sonar_ping_2());
        }
    */





    //% color="#009A00" weight=30 block="（※最小8cm）きょりが |%limit| cmより |%nagasa| " group="6 超音波きょりｾﾝｻｰ"
    //% limit.min=8 limit.max=30
    //% advanced=true
    export function sonar_ping_3(limit: number, nagasa: kyori): boolean {
        let d1 = 0;
        let d2 = 0;
        if (limit < 8) {
            limit = 8
        }
        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d1 + d2;
        }
        switch (nagasa) {
            case kyori.短い:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
            case kyori.長い:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return false;
                } else {
                    return true;
                }
                break;
        }
    }


    //% color="#f071bd" weight=30 blockId=auto_photo_R block="右ﾌｫﾄﾘﾌﾚｸﾀｰ" group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% advanced=true
    export function phto_R() {
        return Math.round((pins.analogReadPin(AnalogPin.P10) / 1023) * 100);
    }

    //% color="#f071bd" weight=28 blockId=auto_photo_L block="左ﾌｫﾄﾘﾌﾚｸﾀｰ" group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% advanced=true
    export function phto_L() {
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }

    //% color="#d4b41f"  weight=26 block="右ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_R| より小さい" group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% limit_R.min=0 limit_R.max=100
    //% advanced=true
    export function photo_R(limit_R: number): boolean {
        if (eureka_plotter_car.phto_R() <= limit_R) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= limit_R) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < limit_R) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#d4b41f"  weight=27 block="左ﾌｫﾄﾘｸﾚｸﾀｰ値 |%limit_L| より小さい" group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% limit_L.min=0 limit_L.max=100
    //% advanced=true
    export function photo_L(limit_L: number): boolean {
        if (eureka_plotter_car.phto_R() <= limit_L) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= limit_L) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#6041f1"  weight=33 block="右だけが |%wb| をふんだ時 しきい値 |%sikii| " group="4　センサー" group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% sence.min=10 sence.max=40
    //% advanced=true
    export function photo_R_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度４０) {
            sikii = 40;
        }
        if (sikii == sence_select.普通３０) {
            sikii = 30;
        }
        if (sikii == sence_select.高感度２０) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.黒:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.白:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#6041f1"  weight=34 block="左だけが |%wb| をふんだ時 しきい値 |%sikii| " group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ" 
    //% advanced=true
    export function photo_L_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度４０) {
            sikii = 40;
        }
        if (sikii == sence_select.普通３０) {
            sikii = 30;
        }
        if (sikii == sence_select.高感度２０) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.黒:
                if (

                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.白:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    //% color="#6041f1"  weight=35 block="左右とも |%wb| をふんでいる時 しきい値 |%sikii| " group="7 ﾌｫﾄﾘﾌﾚｸﾀｰ"
    //% advanced=true
    export function photo_LR_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.低感度４０) {
            sikii = 40;
        }
        if (sikii == sence_select.普通３０) {
            sikii = 30;
        }
        if (sikii == sence_select.高感度２０) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.黒:
                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 <= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 <= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;

            case whiteblack.白:

                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 >= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 >= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }

    }

    //% color="#009A00"  weight=19 blockId=microbit2_decideLight block="m:bit光ｾﾝｻ値 |%limit| より暗い" group="8 microbitの光ｾﾝｻ"
    //% limit.min=0 limit.max=100
    //% advanced=true
    export function microbit2_decideLight(limit: number): boolean {
        if (input.lightLevel() / 254 * 100 < limit) {
            return true;
        } else {
            return false;
        }
    }



    //% color="#009A00"  weight=17 blockId=microbit2_denkitemp block="m:bit光ｾﾝｻ値" group="8 microbitの光ｾﾝｻ"
    //% advanced=true
    export function microbit2_denkitemp(): number {

        return Math.round(input.lightLevel() / 254 * 100);

    }

    /*
        //% color="#228b22"  weight=16 blockId=microbit2_denkiLED block="m:bit光ｾﾝｻの値表示（確認のみ）" group="8 microbitの光ｾﾝｻ"
        //% advanced=true
        export function microbit2_denkiLED() {
            basic.showNumber(Math.round(input.lightLevel() / 254 * 100));
        }
    */




}

//% color="#ff4500" weight=94 block="ﾌﾟﾛｯﾄｶｰ・LED"

namespace plotLED_blocks {


    //% color="#20b2aa" weight=82 blockId=neopixel_select block="ﾌﾙｶﾗｰLED |%neo_color| 色で光る" group="ﾌﾟﾛｯﾄｶｰLED"
    export function neopixel_select_block(neo_color: neoLED_color) {

        switch (neo_color) {
            case neoLED_color.赤:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Red))
                break;
            case neoLED_color.だいだい:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Orange))
                break;
            case neoLED_color.黄:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Yellow))
                break;
            case neoLED_color.緑:

                io_neo.showColor(neopixel.colors(NeoPixelColors.Green))
                break;
            case neoLED_color.青:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Blue))
                break;
            case neoLED_color.あい:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Indigo))
                break;
            case neoLED_color.すみれ:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Violet))
                break;
            case neoLED_color.紫:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Purple))
                break;
            case neoLED_color.白:
                io_neo.showColor(neopixel.colors(NeoPixelColors.White))
                break;
            case neoLED_color.黒:
                io_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                break;
        }
    }

    //% color="#9400d3" weight=81 blockId=neopixel_reinbow block="にじ色にする" group="ﾌﾟﾛｯﾄｶｰLED"
    export function neopixel_rainbow() {
        io_neo.showRainbow(1, 180)
    }

    //% color="#cd853f" weight=80 blockId=neopixel_erace block="ﾌﾙｶﾗｰLEDを全部消す" group="ﾌﾟﾛｯﾄｶｰLED"
    export function neopixel_erace_block() {
        for (let n = 0; n < 4; n++) {
            io_neo.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    }

    //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="ﾌﾟﾛｯﾄｶｰLED"
    //% second.min=0 second.max=10
    export function driveForwards(second: number): void {
        basic.pause(second * 1000);
    }




}



