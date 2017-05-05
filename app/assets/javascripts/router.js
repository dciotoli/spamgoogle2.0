function rating(data){
  var sumIncline=0;
  for(i = 0;i<data.length;i++){
    if(data[i]>0){
      sumIncline+=data[i];
    }
  }
  return sumIncline;
}
