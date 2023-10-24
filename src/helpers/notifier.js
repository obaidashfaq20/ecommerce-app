import React from 'react'
import { Col, Row, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNofificationCopiedModal } from '../features/setting/settingSlice';

export default function Notifier() {
  const showNotificationCopiedModal = useSelector(state => state.setting.showNotificationCopiedModal);
  const dispatch = useDispatch();
  return (
    <Row className='container p-3 z-index-10'>
      <Col xs={6}>
        <Toast
          onClose={() => dispatch(setShowNofificationCopiedModal(false))}
          show={showNotificationCopiedModal}
          delay={3000}
          autohide
          bg='success'
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Token</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body className='success'>Token Copied to Clipboard</Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}
