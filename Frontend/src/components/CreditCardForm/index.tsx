import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { isMobile } from 'react-device-detect'
import { IoMdLock } from 'react-icons/all'
// import { FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { apiClientWithToken } from '@/store/apiClient'

import { LogoBig } from '../../assets/icons/LogoBig'
import APPLE_PAY from '../../assets/images/applepay.svg'
import GOOGLE_PAY from '../../assets/images/googlepay.svg'
import MASTER_CARD from '../../assets/images/mastercard.svg'
import VISA from '../../assets/images/visa.svg'

import { CountryList } from './CountryList'

export interface State {
  firstname: string
  lastname: string
  cardnumber: string
  securecode: string
  expiry: Date
  country: string
}
const CreditCardForm: React.FC = () => {
  const navigate = useNavigate()

  const [fields, setFields] = useState<State>({
    cardnumber: '',
    country: '',
    expiry: new Date(),
    firstname: '',
    lastname: '',
    securecode: '',
  })

  const handleStartFreeTrial = (e: any) => {
    // remove this after test
    navigate('/setup/intro')
    return
    e.preventDefault()
    apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/payment/create', fields)
      .then(() => {
        // console.log(response.data.message)
      })
      .catch((err: any) => {
        if (err.response === undefined) {
          // console.log('something went wrong')
        } else {
          // console.log(err.response.data.message)
        }
      })
    navigate('/setup/intro')
  }
  return (
    <div className="credit-cards-container d-flex flex-column">
      <div className="header py-4 pt-4">
        {isMobile && (
          <div className="mobile-header align-items-center position-relative">
            <div className="position-absolute mobile-header-logo">
              <LogoBig width="80" height="80" />
            </div>
          </div>
        )}
      </div>
      <div className="body">
        <div className="content-body">
          <div className="text-center">
            {isMobile ? (
              <>
                <p className="label text-gray-color--1 mb-4">
                  Your are at 256-bit encryption payment page now. We secure
                  your data right before you start your journey.
                </p>
              </>
            ) : (
              <>
                <h3 className="big-title text-secondary-color">
                  You are at 256-bit encryption payment page now
                </h3>
                <p className="paragraph text-gray-color--1 my-5">
                  We secure your data right before you start your journey
                </p>
              </>
            )}
          </div>
          <Card
            style={{ backgroundColor: 'transparent' }}
            className="background-transparent el-border-primary"
          >
            <Card.Header>
              <div className="credit-card-header d-flex justify-content-between align-items-center flex-row bg-transparent">
                <p className="mb-0">
                  We accept credit card, debit card, or the latest Apple Pay and
                  Google Pay
                </p>
                <div className="d-flex justify-content-end flex-row">
                  <img src={VISA} alt="VISA" />
                  <img src={MASTER_CARD} alt="MASTER_CARD" />
                  <img src={APPLE_PAY} alt="APPLE_PAY" />
                  <img src={GOOGLE_PAY} alt="GOOGLE_PAY" />
                </div>
              </div>
            </Card.Header>
            <Card.Body className="credit-card-body">
              <Form>
                <div className="row">
                  {isMobile && (
                    <div className="col-md-6">
                      <Form.Group controlId="firstName">
                        <Form.Label className="label">Card Number</Form.Label>
                        <Form.Control
                          className="background-transparent el-border-primary text-sm"
                          style={{ backgroundColor: 'transparent' }}
                          type="text"
                          onChange={(e) =>
                            setFields({
                              ...fields,
                              cardnumber: e.target.value,
                            })
                          }
                          placeholder="Enter your card number"
                        />
                      </Form.Group>
                    </div>
                  )}
                  <div className="col-md-6">
                    <Form.Group controlId="firstName">
                      <Form.Label className="label">First Name</Form.Label>
                      <Form.Control
                        className="background-transparent el-border-primary text-sm"
                        style={{ backgroundColor: 'transparent' }}
                        type="text"
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            firstname: e.target.value,
                          })
                        }
                        placeholder="Your first name"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="label">Last Name</Form.Label>
                      <Form.Control
                        className="background-transparent el-border-primary text-sm"
                        style={{ backgroundColor: 'transparent' }}
                        type="text"
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            lastname: e.target.value,
                          })
                        }
                        placeholder="Your last name"
                      />
                    </Form.Group>
                  </div>
                </div>
                {isMobile && (
                  <div className="row flex-column">
                    <div className="col-md-12">
                      <Form.Group controlId="expiration">
                        <Form.Label className="label">
                          Expiration Date
                        </Form.Label>
                        <div className="d-flex justify-content-start flex-row">
                          <Form.Control
                            className="background-transparent el-border-primary mr-1 text-sm"
                            style={{ backgroundColor: 'transparent' }}
                            type="text"
                            placeholder="Month"
                          />
                          <Form.Control
                            className="background-transparent el-border-primary ml-1 mr-4 text-sm"
                            style={{ backgroundColor: 'transparent' }}
                            type="text"
                            placeholder="Year"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                )}
                <div className="row">
                  {!isMobile && (
                    <div className="col-md-6">
                      <Form.Group controlId="firstName">
                        <Form.Label className="label">Card Number</Form.Label>
                        <Form.Control
                          className="background-transparent el-border-primary text-sm"
                          style={{ backgroundColor: 'transparent' }}
                          type="text"
                          onChange={(e) =>
                            setFields({
                              ...fields,
                              cardnumber: e.target.value,
                            })
                          }
                          placeholder="Enter your card number"
                        />
                      </Form.Group>
                    </div>
                  )}
                  <div className="col-md-6">
                    <Form.Group className="w-100" controlId="formBasicEmail">
                      <Form.Label className="label">
                        Secure Code(CVV2/CVC2)
                      </Form.Label>
                      <div className="d-flex justify-content-between">
                        <div className="secure-code-input">
                          <FormControl
                            className="background-transparent el-border-primary text-sm"
                            onChange={(e) =>
                              setFields({
                                ...fields,
                                securecode: e.target.value,
                              })
                            }
                          />
                          <IoMdLock size={16} />
                        </div>
                        <Form.Text
                          style={{ marginLeft: '0.5rem', width: '65%' }}
                          className="mt-auto text-xs"
                          muted
                        >
                          The last 3 digit displayed on the back of your card
                        </Form.Text>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  {!isMobile && (
                    <div className="col-md-6">
                      <Form.Group controlId="firstName">
                        <Form.Label className="label">
                          Expiration date
                        </Form.Label>
                        <div className="d-flex justify-content-start flex-row">
                          <Form.Control
                            className="background-transparent el-border-primary mr-1 text-sm"
                            style={{ backgroundColor: 'transparent' }}
                            type="text"
                            placeholder="Month"
                          />
                          <Form.Control
                            className="background-transparent el-border-primary ml-1 mr-4 text-sm"
                            style={{ backgroundColor: 'transparent' }}
                            type="text"
                            placeholder="Year"
                          />
                        </div>

                        {/* <div className="d-flex flex-row justify-content-between">
                          <DatePicker
                            selected={fields.expiry}
                            onChange={(date, e) => setFields({
                              ...fields,
                            })}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                          />
                        </div> */}
                      </Form.Group>
                    </div>
                  )}
                  <div className="col-md-6">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="label">
                        Country or Region
                      </Form.Label>
                      <Form.Control
                        className="background-transparent el-border-primary text-sm"
                        as="select"
                        onChange={(e) =>
                          setFields({
                            ...fields,
                            country: e.target.value,
                          })
                        }
                      >
                        {CountryList.map((country: string, idx: number) => {
                          return <option key={idx}>{country}</option>
                        })}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>

                <div className="row margin-top-md">
                  <div className="col-md-4">
                    <button
                      className="btn btn-block mindmail-button button-primary button-label"
                      onClick={handleStartFreeTrial}
                    >
                      Start Free Trial
                    </button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreditCardForm
