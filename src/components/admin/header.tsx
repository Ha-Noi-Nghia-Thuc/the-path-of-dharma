import type { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

const AdminHeader = ({ session }: AdminHeaderProps) => {
  const userName = session?.user?.name || "Quản trị viên";

  return (
    <header className="border-b border-border pb-4 mb-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-foreground">
          Xin chào, {userName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Quản lý người dùng và nội dung kinh điển
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;
