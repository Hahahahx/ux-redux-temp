import React from "react";
import { Button } from "antd";
import { useModule } from "@/components/Provider/Provider";
import UserApi from "@/modules/service/UserApi";

const Main = () => {
  const { UserModule, FileModule } = useModule();

  return (
    <div style={{ textAlign: "center" }}>
      <div className="page">
        FileModule - fileType:{FileModule.fileType} <br />
        UserModule - user:name:{UserModule.user.name}
      </div>
      <Button
        ghost
        onClick={() => {
          UserApi.getUserInfo("sd");
          UserModule.actionUser();
        }}
      >
        ChangeUserModule
      </Button>
      <Button
        ghost
        htmlType="button"
        onClick={() => {
          UserApi.getChangeColor().then((res) => {
            var head = document.getElementsByTagName("head")[0];
            var style = document.createElement("style");
            style.innerText = res.result.res
            head.appendChild(style);
            //console.log(res);
          });
          //   const res = await Axios.get("http://localhost:8080/lessc", {
          //     headers: { "Access-Control-Allow-Origin": "*" },
          //   });
          // var head = document.getElementsByTagName("head")[0];
          // var link = document.createElement("link");
          // link.href = "color.css";
          // link.rel = "stylesheet";
          // link.type = "text/css";
          // head.appendChild(link);
        }}
      >
        ChangeColor
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch("http://localhost:8080/anything", {
            headers: { "Access-Control-Allow-Origin": "*" },
          });
        }}
      >
        Test
      </Button>
    </div>
  );
};

export default React.memo(Main, () => true);
