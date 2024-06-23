import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='u-mt-1'>
        <button className='btn'>
          <Link href="/math">Starte Mathe (Plus / Minus)</Link>
        </button>
      </div>
      <div className='u-mt-1'>
        <button className='btn'>
          <Link href="/math">Starte Zählen</Link>
        </button>
      </div>
      <div className='u-mt-1'>
        <button className='btn'>
          <Link href="/math">Starte Mengen</Link>
        </button>
      </div>
    </>
  )
}
