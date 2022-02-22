import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from './../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Rettiwt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-white">
        <Sidebar />
      </main>
    </div>
  )
}

export default Home
