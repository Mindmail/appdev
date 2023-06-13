import { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

interface IToastContent {
  title?: string
  content: string
  time?: string
}
const withToast = (Component: React.FC<any>) => (props: any) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState<IToastContent>({
    content: '',
    time: '',
    title: '',
  })
  const handleClose = () => setShow(!show)
  const toast = (content: string, _title = 'Mindmail', _time = 'Just now') => {
    setData({
      content,
      time: _time,
      title: _title,
    })
    setShow(true)
  }
  return (
    <>
      <Component {...props} toast={toast} />
      <ToastContainer position="bottom-start" className="p-3">
        <Toast show={show} onClose={handleClose}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="me-2 rounded"
              alt=""
            />
            <strong className="me-auto">{data.title}</strong>
            <small>{data?.time}</small>
          </Toast.Header>
          <Toast.Body>{data.content}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export { withToast }
