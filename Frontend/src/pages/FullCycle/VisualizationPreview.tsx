import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/assets/scss/pages/full-cycle/visualization.scss'
import { withToast } from '@/components'
import { apiClientWithToken } from '@/store/apiClient'

interface photo {
  id: number
  photoURL: string
}

interface property {
  musictime: number
  musicURL: string
}

const VisualizationPreview: React.FC<{ toast: AnyFunction }> = ({ toast }) => {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<photo[]>([
    {
      id: 1,
      photoURL: 'url',
    },
  ])
  const [property, setProperty] = useState<property>()
  useEffect(() => {
    getPhotos()
  }, [])

  useEffect(() => {
    getProperty()
  }, [photos])

  const getPhotos = async () => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/visualization/visualizationimages')
      .then((res) => {
        setPhotos(res.data.data)
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
      })
  }

  const getProperty = async () => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/visualization/getmusicproperty')
      .then((res) => {
        if (res.data.items && res.data.items.length > 0)
          setProperty({
            musicURL: res.data.items[0].musicURL,
            musictime:
              res.data.items[0].musictype === 's'
                ? res.data.items[0].musictime * 1000
                : res.data.items[0].musictime * 1000 * 60,
          })
        else {
          setProperty({
            musicURL: '',
            musictime: 3000,
          })
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
      })
  }

  const goToCongratulationPage = () => {
    navigate('/full-cycle/celebration1')
  }

  const afterChange = (current: number) => {
    if (photos.length - 1 === current) {
      setTimeout(() => {
        goToCongratulationPage()
      }, property?.musictime)
    }
  }

  const settings = {
    afterChange,
    arrows: false,
    autoplay: true,
    autoplaySpeed: property?.musictime,
    dots: false,
    fade: true,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    touchMove: false,
  }

  return (
    <div className="visualization-preview-page">
      <Slider {...settings}>
        {photos.map((image, index) => (
          <div key={index}>
            <img key={index} src={image.photoURL} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default withToast(VisualizationPreview)
