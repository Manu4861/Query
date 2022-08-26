import React, { useEffect, useState } from 'react'
import {
  Divider,
  Heading,
  HStack,
  Input,
  ScrollView,
  Spinner,
  VStack,
} from 'native-base'
import { StatusBar, TouchableOpacity } from 'react-native'
import { useFirestore } from 'react-redux-firebase'

const Search = ({ navigation }) => {
  const [qry, setQry] = useState('')
  const [loading, setLoading] = useState(false)
  const [res_search, setResSearch] = useState([])
  const firestore = useFirestore()

  async function search() {
    const data = []
    setLoading(true)
    if (qry.length > 0) {
      const res = await firestore
        .collection('questions')
        .where('question', '>=', qry)
        .get({ source: 'server' })
      res.docs.map((value) => {
        data.push({ ...value.data(), qid: value.id })
      })
    }
    setResSearch(data)
    setLoading(false)
  }

  useEffect(() => {
    search(qry)
  }, [qry])

  return (
    <VStack flex={1}>
      <HStack
        marginTop={StatusBar.currentHeight}
        alignItems={'center'}
        justifyContent={'center'}
        py={'1'}
      >
        <Input
          width={'90%'}
          height={'90%'}
          size={'md'}
          placeholder={'search questions here...'}
          onChangeText={(in_qry) => {
            setQry(in_qry)
          }}
          keyboardType={'web-search'}
          onKeyPress={(e) => console.log(e)}
          placeholderTextColor={'text.darksec'}
        />
      </HStack>
      <ScrollView>
        <VStack>
          {res_search.map(({ question, qid, createdAt, answersCount }, i) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Answers', {
                      Nqid: qid,
                    })
                  }
                  key={qid + createdAt}
                >
                  <HStack py={'2.5'} px={'5'}>
                    <Heading fontSize={'md'}>{question}</Heading>
                  </HStack>
                  <Divider />
                </TouchableOpacity>
              </>
            )
          })}
        </VStack>
        {loading && qry ? (
          <Spinner mt={'5'} size={'lg'} color={'app.pri'} />
        ) : null}
      </ScrollView>
    </VStack>
  )
}

export default Search
