import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DialogModal = (props) => {
    return (

        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title ?? ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DialogModal;