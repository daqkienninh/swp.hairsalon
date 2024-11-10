import { Button, Result } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function ProtectRoute(role, children) {
  // check xem thằng đang đăng nhập có role là gì
  const user = useSelector((store) => store.user);
  if (user && user.role === role) {
    return children;
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}

export default ProtectRoute;
