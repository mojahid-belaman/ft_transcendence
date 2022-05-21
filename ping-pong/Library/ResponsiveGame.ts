import { Socket } from "socket.io-client";
import { Data, StateGame } from "../library/Data";

export function responseGame(data: any, socket: Socket, setDataGame: Function): void {
  if (
    data.get_State() === StateGame.WAIT ||
    data.get_State() === StateGame.PLAY
  ) {
    if (window.innerWidth > 1200) {
      console.log("great than 1200");
      data = new Data(1200, 600);
      socket.emit("resize", data);
    } else if (window.innerWidth > 800 && window.innerWidth <= 1200) {
      console.log("between 1200 and 800");
      data = new Data(800, 400);
      socket.emit("resize", data);
    } else if (window.innerWidth > 576 && window.innerWidth <= 800) {
      console.log("between 992 and 600");
      data = new Data(550, 400);
      socket.emit("resize", data);
    } else if (window.innerWidth <= 576) {
      console.log("less than 576");
      data = new Data(450, 350);
      socket.emit("resize", data);
    }
    setDataGame(data);
  } else if (data.get_State() === StateGame.OVER) {
    if (window.innerWidth > 1200) {
      data.set_Width(1200);
      data.set_Height(600);
      data.set_Trace_X(data.get_Width());
      data.set_Paddle_Height(data.get_Height());
      data.set_Right_Pddle_X(data.get_Width());
      data.set_PddleLeft_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_PddleRight_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_Ball_X(data.get_Width() / 2);
      data.set_Ball_Y(data.get_Height() / 2);
    } else if (window.innerWidth > 800 && window.innerWidth <= 1200) {
      data.set_Width(800);
      data.set_Height(400);
      data.set_Trace_X(data.get_Width());
      data.set_Paddle_Height(data.get_Height());
      data.set_Right_Pddle_X(data.get_Width());
      data.set_PddleLeft_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_PddleRight_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_Ball_X(data.get_Width() / 2);
      data.set_Ball_Y(data.get_Height() / 2);
    } else if (window.innerWidth > 576 && window.innerWidth <= 800) {
      data.set_Width(600);
      data.set_Height(400);
      data.set_Trace_X(data.get_Width());
      data.set_Paddle_Height(data.get_Height());
      data.set_Right_Pddle_X(data.get_Width());
      data.set_PddleLeft_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_PddleRight_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_Ball_X(data.get_Width() / 2);
      data.set_Ball_Y(data.get_Height() / 2);
    } else if (window.innerWidth <= 576) {
      data.set_Width(450);
      data.set_Height(350);
      data.set_Trace_X(data.get_Width());
      data.set_Paddle_Height(data.get_Height());
      data.set_Right_Pddle_X(data.get_Width());
      data.set_PddleLeft_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_PddleRight_Y(
        data.get_Height() / 2 - data.get_Paddle_Height() / 2
      );
      data.set_Ball_X(data.get_Width() / 2);
      data.set_Ball_Y(data.get_Height() / 2);
    }
    setDataGame(data);
  }
}
