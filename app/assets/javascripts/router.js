function rating(data){
  var sumIncline=0;
  for(i = 1;i<data.length;i++){
    if(data[i]>0){
      sumIncline+=data[i]+data[i-1];
    }
  }
  return sumIncline;
}
