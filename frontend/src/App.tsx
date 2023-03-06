import { useState, useEffect, SetStateAction } from 'react'
import { ethers } from 'ethers'
import WavePortal from '../WavePortal.json'
import { useAccount } from "wagmi";
import moment from 'moment'
import { Heading, Flex, VStack, Button, HStack, Text, Link, Card, CardBody, CardHeader, CardFooter, Input } from '@chakra-ui/react';
import { Topbuttons } from "./Components/topbuttons";
import './App.css'

const contractAddress = '0x8a4fa020bbd533e51240bb1d729ecafe8c4d79e7'

function App() {
  useEffect(() => {
    getAllWaves()
    getTotalWaves()
  }, [])
  const [viewState, setViewState] = useState('view-posts')
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')
  const [totalWaves, setTotalWaves] = useState(0)
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(address) {
      getAllWaves()
      getTotalWaves()
    }``
  }, [address])
  const [errorMessage, setErrorMessage] = useState('')
  
  async function getAllWaves() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, provider)
    let data = await contract.getAllWaves()
    data = data.map((d: { waver: string, message: string; timestamp: string }) => ({
      waver: d['waver'],
      message: d['message'],
      timestamp: d['timestamp'],
    }))
    setPosts(data)
  }

  async function getTotalWaves() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, provider)
    const totalWaves = await contract.getTotalWaves()
    console.log('total waves', totalWaves)
    setTotalWaves(totalWaves.toString())
  }

  async function wave() {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider((window.ethereum as any))
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, WavePortal.abi, signer)
      const tx = await contract.wave(message)
      await tx.wait()
      setLoading(false);
      setViewState('view-posts')
    } catch (error) {
      setErrorMessage('Something is off - please try again!')
    }
  }

  function toggleView(value: SetStateAction<string>) {
    setViewState(value)
    if (value === 'view-posts') {
      getAllWaves()
      getTotalWaves()
    }
  }

  return (
    <div>
      <Topbuttons />
      <Flex
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        minHeight="90vh"
      >
      <VStack p="8" maxWidth="800px">
        <Heading size="2xl" mb="5">🅱️itkit</Heading>
        {!address ? (<div>
        <Heading size="md" pb="3">What is 🅱️itkit?</Heading>
        <Text pb="3">Bitkit is built with <Link href='https://bitcoin.org/' target="_blank">Bitcoin</Link>, <Link href='https://rollkit.dev/' target="_blank">Rollkit</Link>, & <Link href='https://github.com/celestiaorg/ethermint' target="_blank">Ethermint</Link>.</Text>
        <Text pb="3">Bitkit is  is a smart contract demo on a <Link href='https://celestia.org/glossary/sovereign-rollup' target="_blank">sovereign rollup</Link> built on Bitcoin to provide <Link href='https://celestia.org/glossary/data-availability' target="_blank">data availability</Link> & <Link href='https://ethereum.org/en/developers/docs/consensus-mechanisms' target="_blank">consensus</Link>, leveraging Ethermint with Rollkit as the <Link href='https://celestia.org/glossary/execution-environment' target="_blank">execution environment</Link>.</Text>
        <Text pb="3">The implementation was possible due to Bitcoin's Taproot upgrade and Ordinals' usage of Bitcoin for publishing arbitrary data. Read more in the <Link href="https://rollkit.dev/blog/sovereign-rollups-on-bitcoin/" target="_blank">blog post</Link>.</Text>
        <Text pb="3">If you'd like to test out the demo, message <Link href='https://twitter.com/JoshCStein' target="_blank">@JoshCStein</Link> or <Link href='https://twitter.com/nashqueue' target="_blank">@nashqueue</Link> on Twitter for funds.</Text>
        </div> ) : null}
        {address ? (
        <HStack>
           {viewState == 'view-posts' && <Button onClick={() => toggleView('view-posts')} colorScheme="gray">Load messages</Button>}
          {viewState !== 'create-post' && <Button onClick={() => toggleView('create-post')} colorScheme="orange">Inscribe message</Button>}
        </HStack>
        ) : null}
        {
          viewState === 'view-posts' && address && (
            <div style={{ textAlign: 'left'}}>
              <div>
              <Heading size="lg" pb="3" pt="5" textAlign="center">Messages</Heading>
              <Heading size="md" pb="3" textAlign="right">☀️ Total messages: {totalWaves}</Heading>
              {
                posts.slice().reverse().map((post, index) => (
                  <Card mb="2">
                  <div key={index}>
                    <CardHeader fontSize="xl" fontWeight="bold">{(post as any).message}</CardHeader>
                    <CardBody py="0" className="address">📤 From: {(post as any).waver}</CardBody>
                    <CardFooter pt="0">⏰ Messaged at: {moment.unix((post as any).timestamp).format('lll')}</CardFooter>
                  </div>
                  </Card>
                ))
              }
            </div>
            </div>
          )
        }
        {
          viewState === 'create-post' && (
            <VStack alignItems="center" p="3">
                <Heading size="md" pt="5" pb="3">Inscribe message</Heading>
                <Input
                  placeholder='Message'
                  onChange={e => setMessage(e.target.value)}
                />
                {errorMessage && <div style={{ padding: '5px' }}>{errorMessage}</div>}
                <Button onClick={wave} colorScheme="orange">Send</Button>
                <Button onClick={() => toggleView('view-posts')} colorScheme="gray">Back</Button>
                {!errorMessage && loading ? <div style={{padding: '10px'}}>Transaction processing...</div> : null}
            </VStack>
          )
        }
        <br />
        <Text textAlign="center" fontStyle="italic">This site and smart contract are <Link href='https://github.com/jcstein/bitkit' target="_blank">open source</Link>{' '}and{' '}the{' '}<Link href='https://plausible.io/bitkit.dev' target="_blank">analytics</Link> are GDPR compliant</Text>
      </VStack>
      </Flex>
      </div>
  )
}

export default App