import { useEffect, useState } from 'react'
import '../../App.css'

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form Uzerindeki Tum Alanlari Kontrol Ediyoruz
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Kullanicinin Veri Girmeye Basladigi Alanın Hatasini Temizliyoruz
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  }

  // Gonder Butonuna Tiklandiginda 
  // Ekranda Gorunecek 
  // Bilgilendirme Mesajini Suresini Belirliyoruz
  useEffect(() => {
    if (submit) {
      const timer = setTimeout(() => {
        setSubmit(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submit]);

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
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli Bir E-Mail Adresi Giriniz";
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
  // useEffect(() => {
  //   if (submit) {
  //     console.log("Mesaj Gönderildi");
  //   }
  // }, [submit])

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Kullanicidan Alinan Veriyi Yazdiriyoruz
    console.log("Gönderilen Veriler:", formData);

    setErrors({});
    setSubmit(true);

    // Kullanici Bilgileri Girdikten Sonra 
    // Gonder Butonuna Tikladiginda 
    // Formda Girilen Bilgileri Sifirliyoruz
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      query: "",
      message: "",
      consent: false
    });
  }

  return (
    <>
      <div className='out-color'>
        <div className="form-wrapper">
          {submit && (
            <div className='success-message'>
              <div className="success-title">
                <span className='success-icon'>✓</span>
                <h1>Mesaj Gönderildi</h1>
                <h4>Formu doldurduğunuz için teşekkür ederiz. Yakında sizinle iletişime geçeceğiz!</h4>
              </div>
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
                    className={errors.firstName ? "error-input" : ""}
                  />
                  {errors.firstName && <span className="error">{errors.firstName ? 'Bu Alan Boş Bırakılamaz' : ''}</span>}
                </div>
                <div className='user-information'>
                  <h4>Soyadınız</h4>
                  <input
                    type="text"
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Soyadınızı Giriniz'
                    className={errors.lastName ? "error-input" : ""}
                  />
                  {errors.lastName && <span className="error">{errors.lastName ? 'Bu Alan Boş Bırakılamaz' : ''}</span>}
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
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className='query-type'>
                <h4>Sorgu Türü</h4>
                <div className={`query-options ${errors.query ? "error-radio" : ""}`}>
                  <label className='query-types'>
                    <input
                      type="radio"
                      name='query'
                      value="genel"
                      checked={formData.query === "genel"}
                      onChange={handleChange}
                    />
                    Genel Sorular
                  </label>
                  <label className='query-types'>
                    <input
                      type="radio"
                      name='query'
                      value="destek"
                      checked={formData.query === "destek"}
                      onChange={handleChange}
                    />
                    Destek Talebi
                  </label>
                </div>
                {errors.query && <span className="error">{errors.query}</span>}
              </div>
              <div className='message'>
                <h4>Mesaj</h4>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "error-input" : ""}
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