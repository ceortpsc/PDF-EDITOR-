export const templateCatalog = Array.from({length:150},(_,i)=>({
  id:`tpl-${String(i+1).padStart(3,'0')}`,
  name:`Template ${String(i+1).padStart(3,'0')}`,
  category:['Business','HR','Finance','Operations','Legal/Admin','Sales','Marketing','Education','Tax','Real Estate','Healthcare','Client Services'][i%12],
  editable:true,
  fields:['title','date','owner','notes'],
  status:'seeded'
}));
