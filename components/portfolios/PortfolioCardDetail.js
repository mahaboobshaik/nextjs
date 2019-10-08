import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PortfolioCardDetail extends React.Component {
    

    render() {

        const { isOpen, toggle, pIndex } = this.props;

        return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Portfolio title {pIndex}</ModalHeader>
            <ModalBody>
                <p><b>Description: </b>Portfolio Description {pIndex}</p>
                <p><b>Company: </b>Portfolio Company {pIndex}</p>
                <p><b>Position: </b>Portfolio Position {pIndex}</p>
                <p><b>Location: </b>Portfolio Location {pIndex}</p>
                <p><b>startDate: </b>Portfolio startDate {pIndex}</p>
                <p><b>endDate: </b>Portfolio endDate {pIndex}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default PortfolioCardDetail;