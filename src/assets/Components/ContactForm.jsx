import { useEffect, useState } from 'react'
import '../../App'

export default function ContactForm() {

  const [submit, setSubmit] = useState(false);

  // Kullanicinin Doldurmasi Gereken Alanlarin 
  // Tek Merkez Uzerinden Kontrol Edilebilir Hale Getiriyoruz
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
    message: "",
    consent: false
  });

  // Kullanicinin Doldurmasi Gereken Alanlar Bos Ise Hata Mesaji Veriyoruz
  const [errors, setErrors] = useState({});

  // Form Uzerindeki Tum Alanlari Kontrol Ediyoruz
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  // Form Uzerindeki Alanlarin Doluluk Kontrolunu Yapiyoruz
  function validate() {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Bu Alan Boş Bırakılamaz";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Bu Alan Boş Bırakılamaz";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Bu Alan Boş Bırakılamaz";
    }

    if (!formData.query) {
      newErrors.query = "Bu Alan Boş Bırakılamaz";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Bu Alan Boş Bırakılamaz";
    }

    if (!formData.consent) {
      newErrors.consent = "Bu Alan Boş Bırakılamaz";
    }

    return newErrors;
  }

  // Gonder Butonuna Tiklandiginda Yapilacak Islem
  useEffect(() => {
    if (submit) {
      console.log("Mesaj Gönderildi");
    }
  }, [submit])

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmit(true);
  }

  return (
    <>
      <div className='out-color'>
        <div className="form-wrapper">
          {submit && (
            <div className='success-message'>
              <h1>Mesaj Gönderildi</h1>
              <h4>Formu doldurduğunuz için teşekkür ederiz. Yakında sizinle iletişime geçeceğiz!</h4>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='in-color'>
              <h1>İletişim Formu</h1>
              <div className="firstname-and-lastname">
                <div className='user-information'>
                  <h4>Adınız</h4>
                  <input
                    type="text"
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='Adınızı Giriniz'
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className='user-information'>
                  <h4>Soyadınız</h4>
                  <input
                    type="text"
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Soyadınızı Giriniz'
                  />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
              </div>
              <div className='user-information'>
                <h4>E-Mail Adresiniz</h4>
                <input
                  type="text"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='E-Mail Adresiniz Giriniz'
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className='query-type'>
                <h4>Sorgu Türü</h4>
                <div className="query-options">
                  <label className='query-types'>
                    <input
                      type="radio"
                      name='query'
                    />
                    Genel Sorular
                  </label>
                  <label className='query-types'>
                    <input
                      type="radio"
                      name='query'
                    />
                    Destek Talebi
                  </label>
                </div>
              </div>
              <div className='message'>
                <h4>Mesaj</h4>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  id=""
                  rows={10}
                ></textarea>
                {errors.message && <span className="error">{errors.message}</span>}
              </div>
              <label className='check'>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  id=""
                />
                <h4>Ekip tarafından benimle iletişime geçilmesini kabul ediyorum *</h4>
                {errors.consent && <span className="error">{errors.consent}</span>}
              </label>
              <button type='submit'>Gönder</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}