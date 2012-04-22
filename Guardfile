# A sample Guardfile
# More info at https://github.com/guard/guard#readme


guard 'livereload' do
    watch(/(.+).css/)
    watch(/(.+).html/)
    watch(/(.+).js/)
end

guard 'coffeescript', :output => 'compiled' do 
    watch(/src\/(.+.coffee)/)
end

guard 'compass', :project_path => 'style' do 
  watch('^style/(.*)\.s[ac]ss')
end