import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import addItemCart from '../util/addItemCart';
import {useCookies} from 'react-cookie';
import LoginModal from './LoginModal';



function AddToCart({item, numCartItems, setNumCartItems}) {
  const [show, setShow] = useState(false);
  const [count,setCount] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
  const [modalOpen, setModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleShow = () => {
    setShow(true)
  };

  const handleClose = () => {
    setShow(false)
  }
  const handleAdd = async () => {
    let token = cookies['jwtToken']
    let response = await addItemCart({itemId: item.id}, token);
    setNumCartItems(numCartItems+1);
    setShow(false)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>
      <LoginModal open={modalOpen} setOpen={setModalOpen}/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>{`Price: $${item.price.$numberDecimal}`}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim mauris sem, id blandit nunc tincidunt ut. Quisque eleifend risus vel arcu euismod, vitae suscipit eros dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi laoreet nisi a justo ullamcorper auctor. Suspendisse quis ultrices arcu. Cras tempus erat vestibulum pellentesque interdum. Aliquam hendrerit eros vel maximus tincidunt. Quisque maximus libero metus, quis tempus ligula lacinia sit amet. Suspendisse vitae ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus enim urna, posuere a mattis id, feugiat sollicitudin metus.</p>
          </div>
        {/* <Button variant="primary" onClick={decreaseCount} >-</Button>
        {count}
        <Button variant="primary" onClick={increaseCount}>+</Button> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddToCart;