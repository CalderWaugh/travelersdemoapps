import React, {useState} from React;
import {Button, Row, Col, Image, InputNumber, Modal, Row, Space, Topography, message} from "antd"

const {Title, Text} = Typography;

function ProductModal(props){
    const {product,visible,onCancel} = props;
    return (
        <Modal title = {product.name}>
            
        </Modal>
    )
}

export default ProductDetail
