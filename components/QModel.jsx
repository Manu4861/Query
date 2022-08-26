import React from 'react'
import { Heading, Modal, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

const QModel = ({ isOpen, onClose, onDeleteAns, isLoading }) => {
  return (
    <Modal {...{ onClose }} opacity={isLoading ? 0.85 : 1} isOpen={isOpen}>
      <Modal.Content
        w={'96%'}
        alignItems={'center'}
        marginBottom={0}
        marginTop={'auto'}
      >
        <Modal.CloseButton isDisabled={isLoading} />
        <Modal.Header w={'full'} alignItems={'center'}>
          <Heading fontSize={16}>More Actions</Heading>
        </Modal.Header>
        <Modal.Body>
          <TouchableOpacity disabled={isLoading} onPress={() => onDeleteAns()}>
            <Text color={'text.failure'}>Delete Answer</Text>
          </TouchableOpacity>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default QModel
