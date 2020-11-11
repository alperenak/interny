function RenderStars({ starCount }) {
  const disableCount = 5 - starCount;
  return (
    <>
      <RenderActiveStar activeCount={starCount} />
      <RenderDisableStar disableCount={disableCount} />
    </>
  );
}
function RenderDisableStar({ disableCount }) {
  let arr = [];
  for (let i = 0; i < disableCount; i++) {
    arr.push("");
  }
  if (disableCount !== 0) {
    return (
      <>
        {arr.map((item, i) => {
          //   disable Star
          return <img key={i} className={styles.starIcon} />;
        })}
      </>
    );
  } else return <div></div>;
}
function RenderActiveStar({ activeCount }) {
  let arr = [];
  for (let i = 0; i < activeCount; i++) {
    arr.push("");
  }

  if (activeCount !== 0) {
    return (
      <>
        {arr.map((item, i) => {
          // activate star
          return <img key={i} className={styles.starIcon} />;
        })}
      </>
    );
  } else return <div></div>;
}
/*
Yapılacaklar
İki tür render edilme şekli var 
1- Seçilerek
    5 yıldız disable olarak render edilip. tıklandığı yıldızın indexi nazara alınaral seçilen yıldızın
    indexine kadar olan yıldızları render etmek
    - Render olan yıldızların countlarını return etme onChange fonksiyonuyla
    - Bu onChange functionu nasıl olmalı pek bir fikrim yok ama 20 ve 37.satırlardaki img taglerini kapsayan div baz alınabilir
    - yada Onclick fonsiyonuyla event gönderilebilir.(Kullanılabilirlik ve mantikilik düzeyi ziyade derece fazla.) 
2- Read-Only olarak
    Yani sadece StarCount esas alınıp ona göre activateStar render edilecek ki zaten bu yapıldı
   
    

EKSİKLER

iconlar svg olarak mevcut değiller. 20 ve 37.satırlardaki img tagleri src ye ihtiyaç duyuyor
ChooseStar functional olarak yazılmadı hatta hiç yazılmadığından etraflıca düşünüp yazılması gerekiyor



*/
