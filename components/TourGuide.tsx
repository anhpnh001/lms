import React from 'react'
import { useEffect, useState } from 'react'
import type { CallBackProps, Step } from 'react-joyride'
import Joyride, { EVENTS, STATUS } from 'react-joyride'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

interface State {
  run: boolean
  stepIndex: number
  steps: Step[]
}

interface TourGuideProps {
  start: boolean
  setStartTour: (value: boolean) => void
  onTourEnd: () => void
}

const TourGuide = ({ start, setStartTour, onTourEnd }: TourGuideProps) => {
  const [progress, setProgress] = useState<number>(1)
  const totalSteps: number = 4
  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Chào mừng bạn đến với
            <span className="text-sky-700"> BetterMind</span>!
          </h2>
          <p>
            Hãy để chúng tôi hướng dẫn bạn qua các chức năng cơ bản của ứng dụng
            nhé!
          </p>
        </div>
      ),
      styles: {
        options: {
          width: 480,
        },
      },
      placement: 'center',
      target: 'body',
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tìm kiếm</h2>
          <p>Đây là nơi bạn có thể tìm kiếm các khóa học mà bạn quan tâm.</p>
        </div>
      ),
      styles: {
        options: {
          width: 480,
        },
      },
      target: '#step-1',
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh sách khóa học</h2>
          <p>Đây là nơi bạn có thể xem danh sách các khóa học hiện có.</p>
        </div>
      ),
      styles: {
        options: {
          width: 480,
        },
      },
      target: '#step-2',
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Bảng điều khiển</h2>
          <p>
            Đây là nơi bạn có thể xem thông tin về các khóa học mà bạn đang học
            hoặc đã hoàn thành.
          </p>
        </div>
      ),
      styles: {
        options: {
          width: 480,
        },
      },
      target: '#step-3',
    },
    {
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-4">Phụ huynh</h2>
          <p>
            Đây là nơi phụ huynh có thể xem thông tin tổng quan về việc học của
            con.
          </p>
        </div>
      ),
      styles: {
        options: {
          width: 480,
        },
      },
      target: '#step-4',
    },
  ]

  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: generateSteps(progress),
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }))
  }, [progress])

  useEffect(() => {
    if (start) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }))
    }
  }, [start])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 })
      setStartTour(false)
      onTourEnd()
    } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
      setProgress(index + 1)
    }
  }

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      showProgress
      showSkipButton
      spotlightPadding={0}
      debug
      styles={{
        overlay: {
          border: '6px solid lightblue',
        },
        spotlight: {
          border: '2px solid lightblue',
        },
        options: {
          primaryColor: '#0369a1',
        },
      }}
      locale={{
        back: <ArrowLeft className="w-6 h-6" />,
        next: 'Tiếp',
        last: 'Xong',
        skip: 'Bỏ qua',
      }}
    />
  )
}
export default TourGuide
