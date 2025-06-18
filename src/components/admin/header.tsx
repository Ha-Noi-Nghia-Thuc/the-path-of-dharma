import type { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

const AdminHeader = ({ session }: AdminHeaderProps) => {
  const userName = session?.user?.name || "Quản trị viên";
  const userEmail = session?.user?.email || "";

  return (
    <header className="flex lg:items-end items-start justify-between lg:flex-row flex-col gap-5 pb-6 border-b border-border">
      {/* Welcome section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Xin chào, {userName}
        </h1>
        <p className="text-base text-muted-foreground">
          Quản lý người dùng và nội dung kinh điển
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;
