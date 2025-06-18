import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col px-5 xs:px-10 md:px-16 items-center justify-center">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="font-heading text-4xl md:text-5xl text-primary font-semibold">
          Chậm lại một chút!
        </h1>
        <p className="text-lg text-muted-foreground">
          Có vẻ như bạn đang thao tác quá nhanh. Chúng tôi đã tạm dừng để bảo vệ
          hệ thống. Vui lòng nghỉ ngơi một chút và thử lại sau.
        </p>
        <p className="text-sm text-muted-foreground">
          Điều này giúp chúng tôi duy trì chất lượng dịch vụ tốt nhất cho tất cả
          người dùng.
        </p>
      </div>
    </main>
  );
};

export default Page;
