'use client'
import * as Blockly from 'blockly'
import React, { useRef, useEffect } from 'react'

export default function BlocklyComponent() {
  const blocklyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (blocklyRef.current) {
      Blockly.utils.colour.setHsvSaturation(0.6)
      Blockly.utils.colour.setHsvValue(0.8)

      const workspace = Blockly.inject(blocklyRef.current, {
        toolbox: {
          kind: 'categoryToolbox',
          contents: [
            {
              kind: 'category',
              name: 'Logic',
              colour: '#5C81A6',
              contents: [
                {
                  kind: 'block',
                  type: 'controls_if',
                },
                {
                  kind: 'block',
                  type: 'logic_compare',
                },
                {
                  kind: 'block',
                  type: 'logic_operation',
                },
                {
                  kind: 'block',
                  type: 'logic_negate',
                },
                {
                  kind: 'block',
                  type: 'logic_boolean',
                },
                {
                  kind: 'block',
                  type: 'logic_null',
                },
                {
                  kind: 'block',
                  type: 'logic_ternary',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Loops',
              colour: '#5CA65C',
              contents: [
                {
                  kind: 'block',
                  type: 'controls_repeat_ext',
                },
                {
                  kind: 'block',
                  type: 'controls_whileUntil',
                },
                {
                  kind: 'block',
                  type: 'controls_for',
                },
                {
                  kind: 'block',
                  type: 'controls_forEach',
                },
                {
                  kind: 'block',
                  type: 'controls_flow_statements',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Math',
              colour: '#5C68A6',
              contents: [
                {
                  kind: 'block',
                  type: 'math_number',
                },
                {
                  kind: 'block',
                  type: 'math_arithmetic',
                },
                {
                  kind: 'block',
                  type: 'math_single',
                },
                {
                  kind: 'block',
                  type: 'math_trig',
                },
                {
                  kind: 'block',
                  type: 'math_constant',
                },
                {
                  kind: 'block',
                  type: 'math_number_property',
                },
                {
                  kind: 'block',
                  type: 'math_round',
                },
                {
                  kind: 'block',
                  type: 'math_on_list',
                },
                {
                  kind: 'block',
                  type: 'math_modulo',
                },
                {
                  kind: 'block',
                  type: 'math_constrain',
                },
                {
                  kind: 'block',
                  type: 'math_random_int',
                },
                {
                  kind: 'block',
                  type: 'math_random_float',
                },
                {
                  kind: 'block',
                  type: 'math_atan2',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Text',
              colour: '#5CA68D',
              contents: [
                {
                  kind: 'block',
                  type: 'text',
                },
                {
                  kind: 'block',
                  type: 'text_join',
                },
                {
                  kind: 'block',
                  type: 'text_append',
                },
                {
                  kind: 'block',
                  type: 'text_length',
                },
                {
                  kind: 'block',
                  type: 'text_isEmpty',
                },
                {
                  kind: 'block',
                  type: 'text_indexOf',
                },
                {
                  kind: 'block',
                  type: 'text_charAt',
                },
                {
                  kind: 'block',
                  type: 'text_getSubstring',
                },
                {
                  kind: 'block',
                  type: 'text_changeCase',
                },
                {
                  kind: 'block',
                  type: 'text_trim',
                },
                {
                  kind: 'block',
                  type: 'text_count',
                },
                {
                  kind: 'block',
                  type: 'text_replace',
                },
                {
                  kind: 'block',
                  type: 'text_reverse',
                },
                {
                  kind: 'block',
                  type: 'text_print',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Lists',
              colour: '#745CA6',
              contents: [
                {
                  kind: 'block',
                  type: 'lists_create_empty',
                },
                {
                  kind: 'block',
                  type: 'lists_create_with',
                },
                {
                  kind: 'block',
                  type: 'lists_repeat',
                },
                {
                  kind: 'block',
                  type: 'lists_length',
                },
                {
                  kind: 'block',
                  type: 'lists_isEmpty',
                },
                {
                  kind: 'block',
                  type: 'lists_indexOf',
                },
                {
                  kind: 'block',
                  type: 'lists_getIndex',
                },
                {
                  kind: 'block',
                  type: 'lists_setIndex',
                },
                {
                  kind: 'block',
                  type: 'lists_getSublist',
                },
                {
                  kind: 'block',
                  type: 'lists_split',
                },
                {
                  kind: 'block',
                  type: 'lists_sort',
                },
                {
                  kind: 'block',
                  type: 'lists_reverse',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Functions',
              colour: '#9A5CA6',
              contents: [
                {
                  kind: 'block',
                  type: 'procedures_defreturn',
                },
                {
                  kind: 'block',
                  type: 'procedures_defnoreturn',
                },
                {
                  kind: 'block',
                  type: 'procedures_callreturn',
                },
                {
                  kind: 'block',
                  type: 'procedures_callnoreturn',
                },
                {
                  kind: 'block',
                  type: 'procedures_ifreturn',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Variables',
              colour: '#A65C81',
              contents: [
                {
                  kind: 'block',
                  type: 'variables_get',
                },
                {
                  kind: 'block',
                  type: 'variables_set',
                },
                {
                  kind: 'block',
                  type: 'variables_declare',
                },
                {
                  kind: 'block',
                  type: 'variables_change',
                },
              ],
              custom: 'VARIABLE',
            },
          ],
        },
        grid: {
          spacing: 20,
          length: 3,
          colour: 'transparent',
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        scrollbars: true,
        trashcan: true,
      })

      workspace.registerButtonCallback('CREATE_VARIABLE', () => {
        // Prompt the user for a new variable name.
        const variableName = prompt('Enter the name for the new variable:')

        // Check if the user entered a name (i.e., they did not press Cancel)
        if (variableName) {
          // Create the variable in the Blockly workspace
          const newVariable = workspace.createVariable(variableName)
          workspace.updateToolbox(workspace.options.languageTree)
        }
      })

      return () => {
        workspace.dispose()
      }
    }
  }, [])

  return <div ref={blocklyRef} style={{ height: '840px', width: '100%' }} />
}
