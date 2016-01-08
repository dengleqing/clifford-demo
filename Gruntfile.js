/*----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

		// Task jsmin
		uglify: {
			options: {
				banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildall:{
				options:{
					mangle:false,//混淆变量
					preserveComments: 'some',//去除部分注释
					// compress:{  //去除console
					// 	drop_console:true
					// }
				},
				files: [{
					expand: true,
					cwd:'src',
					src:'**/*.js',
					dest:'static'
				}]
			}
		},

		//Task cssmin
		cssmin: {
			/*
			compress: {
				files: {
					'assets/all.min.css': ['css/a.css', 'css/b.css']
				}
			}, */
			smeite: {
				files: {
					'assets/smeite.all.css': ['/play21/smeite.com/public/assets/css/**.css']
				}
			},
			with_banner: {
				options: {
					banner: '/* <%= grunt.template.today("yyyy-mm-dd") %>  */'
				},
				files: [{
					expand: true,
					cwd:'src',
					src:'**/*.css',
					dest:'static'
		        }]
			}
		},

		watch: {
			scripts: {
				files: ['src/scss/*.scss','src/**/*.js','src/**/*.css'],
				tasks: ['build'],
				options: {
					spawn: true,
					interupt: true
				},
			},
		},
		sass: {
            dist: {
                files: {
                    'src/css/index.css': 'src/scss/index.scss',
                    'src/css/icon.css': 'src/scss/icon.scss'
                },
                options: {
                	style: 'expanded',
                    sourcemap: 'true'
                }
            }
        },
       sprite: {
			options: {
				// sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
				imagepath: 'src/slice/',
				// 映射CSS中背景路径，支持函数和数组，默认为 null
				imagepath_map: null,
				// 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
				spritedest: 'static/images/',
				// 替换后的背景路径，默认为 file.dest 和 spritedest 的相对路径
				spritepath: null,
				// 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
				padding: 2,
				// 是否使用 image-set 作为2x图片实现，默认不使用
				useimageset: false,
				// 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
				newsprite: false,
				// 给雪碧图追加时间戳，默认不追加
				spritestamp: true,
				// 在CSS文件末尾追加时间戳，默认不追加
				cssstamp: true,
				// 默认使用二叉树最优排列算法
				algorithm: 'binary-tree',
				// 默认使用`pixelsmith`图像处理引擎
				engine: 'pixelsmith'
			},
			autoSprite: {
				files: [{
					// 启用动态扩展
					expand: true,
					// css文件源的文件夹
					cwd: 'src/css',
					// 匹配规则
					src: 'icon.css',
					// 导出css和sprite的路径地址
					dest: 'src/css/icon',
					// 导出的css名
					ext: '.sprite.css'
				}]
			}
		}
		// Task imagemin
		//  imagemin: {
		// 	dist: { // Target
		// 		options: { // Target options
		// 			optimizationLevel: 3
		// 		},
		// 		files: { // Dictionary of files
		// 			'dist/images/photo.png': 'src/images/photo.png', // 'destination': 'source'
		// 			'dist/images/badge.jpg': 'src/images/badge.jpg'
		// 		}
		// 	}
		// },
		
		// Task htmlmin
		// htmlmin: { 		
		// 	dist: {
		// 		options: {
		// 			removeComments: true,		//去注析
		// 			collapseWhitespace: false	//去换行
		// 		},
		// 		files: { // Dictionary of files
		// 			'dist/html/index.html': ['src/html/index.html']
		// 		}
		// 	}
		// }
		/* E--------------------------------------------------------------------------*/
	});

	// Load the plugin HTML/CSS/JS/IMG min
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadTasks('tasks');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Build task(s).
	//grunt.registerTask('build', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);
  	grunt.registerTask('build', ['sass','sprite','uglify:buildall','cssmin']);
  	grunt.registerTask('icon', ['sprite']);
};