import UserAvatar from '@/components/Dashboard/UserAvatar'

export default function DashboardLayout({
  ref,
  children,
  sideComponent,
}: {
  ref?: any
  children: React.ReactNode
  sideComponent: React.ReactNode
}) {
  return (
    <div className="col-12 h-100">
      <div className="row h-100">
        <div className="col-md-12 col-lg-8">
          <div className="px-md-5 pt-5" ref={ref}>
            <div className="d-flex mobile-dashboard flex-row-reverse">
              <UserAvatar notification={true} />
            </div>
            {children}
          </div>
        </div>
        <div className="d-none d-md-block col-lg-4 bg-gray-color--3 background-sidebar">
          <div className="h-100 px-4 pt-6">
            <div className="d-none d-md-block">
              <UserAvatar notification={true} />
            </div>
            {sideComponent}
          </div>
        </div>
      </div>
    </div>
  )
}
